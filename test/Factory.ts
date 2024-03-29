import {
  loadFixture,
  time,
} from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { PROPOSAL_DATA } from './fixtures/Proposal';
describe('Factory', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.

  async function deployOneEtherFactoryFixture() {
    const ONE_MONTH_IN_SECS = 30 * 24 * 60 * 60;
    const ONE_ETHER = ethers.parseEther('1');
    const endTime = (await time.latest()) + ONE_MONTH_IN_SECS;

    const initialBalance = ONE_ETHER;

    // Contracts are deployed using the first signer/account by default
    const [insuranceAccount, clientAccount, evaluatorAccount] =
      await ethers.getSigners();

    const Factory = await ethers.getContractFactory('Factory');
    const factory = await Factory.deploy({ value: initialBalance });
    await factory.waitForDeployment();
    return {
      factory,
      insuranceAccount,
      clientAccount,
      initialBalance,
      evaluatorAccount,
      endTime,
    };
  }

  describe('Deployment', function () {
    it('Should set the right balance', async function () {
      const { factory, initialBalance } = await loadFixture(
        deployOneEtherFactoryFixture
      );

      const balance = await ethers.provider.getBalance(factory.getAddress());
      expect(balance).to.equal(initialBalance);
    });

    it('Should set the right owner', async function () {
      const { factory, insuranceAccount } = await loadFixture(
        deployOneEtherFactoryFixture
      );

      expect(await factory.insuranceAddress()).to.equal(
        insuranceAccount.address
      );
    });
  });

  describe('Policy creation', () => {
    it('Should create new policy when paying an amount and retrieve it', async () => {
      const {
        factory,
        clientAccount,

        initialBalance,
        endTime,
      } = await loadFixture(deployOneEtherFactoryFixture);
      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() + 12);
      const date = Math.floor(currentDate.getTime() / 1000);

      const premium = ethers.parseEther('1');
      const clientInitialBalance = await ethers.provider.getBalance(
        clientAccount
      );

      expect(await factory.connect(clientAccount).getPolicies()).to.have.length(
        0
      );

      await expect(
        factory
          .connect(clientAccount)
          .createPolicy(JSON.stringify(PROPOSAL_DATA), date)
      ).to.be.revertedWith('To create a policy you must pay a premium.');

      expect(await factory.connect(clientAccount).getPolicies()).to.have.length(
        0
      );
      await time.increaseTo(endTime);

      await expect(
        factory
          .connect(clientAccount)
          .createPolicy(JSON.stringify(PROPOSAL_DATA), date, {
            value: premium,
          })
      ).to.emit(factory, 'PolicyCreated');

      expect(await factory.connect(clientAccount).getPolicies()).to.have.length(
        1
      );

      const balance = await ethers.provider.getBalance(factory.getAddress());
      expect(balance).to.equal(initialBalance + premium);

      expect(await ethers.provider.getBalance(clientAccount)).to.be.lessThan(
        clientInitialBalance - premium
      );
    });

    it('Should renew a policy', async () => {
      const { factory, clientAccount } = await loadFixture(
        deployOneEtherFactoryFixture
      );
      const endDate = Date.now() + 1000;

      const { data: policyAddress } = await factory
        .connect(clientAccount)
        .createPolicy(JSON.stringify(PROPOSAL_DATA), endDate, {
          value: ethers.parseEther('1'),
        });

      const addresses = await factory.connect(clientAccount).getPolicies();

      const newEndDate = endDate + 86400;
      expect(addresses).to.have.length(1);
      await expect(
        factory
          .connect(clientAccount)
          .renewPolicy(addresses[0], newEndDate, 100, {
            value: ethers.parseEther('1'),
          })
      );
    });
    it('should approve a claim', async () => {
      const { factory, clientAccount, evaluatorAccount } = await loadFixture(
        deployOneEtherFactoryFixture
      );
      const endDate = Date.now() + 1000;
      const claimId = 1;
      const claimExpenses = ethers.parseEther('0.1');
      await factory
        .connect(clientAccount)
        .createPolicy(JSON.stringify(PROPOSAL_DATA), endDate, {
          value: claimExpenses,
        });
      const [policyAddress] = await factory
        .connect(clientAccount)
        .getPolicies();
      const prevBalance = await ethers.provider.getBalance(clientAccount);
      await factory.addEvaluator(evaluatorAccount.address);
      await factory.approveClaim(policyAddress, claimId, claimExpenses);
      const newBalance = await ethers.provider.getBalance(clientAccount);

      expect(newBalance).to.be.equal(claimExpenses + prevBalance);
    });

    it('should decline a claim', async () => {
      const { factory, clientAccount, evaluatorAccount } = await loadFixture(
        deployOneEtherFactoryFixture
      );
      const endDate = Date.now() + 1000;
      const claimId = 1;
      const claimExpenses = ethers.parseEther('0.1');
      await factory
        .connect(clientAccount)
        .createPolicy(JSON.stringify(PROPOSAL_DATA), endDate, {
          value: claimExpenses,
        });
      const [policyAddress] = await factory
        .connect(clientAccount)
        .getPolicies();
      const prevFactoryBalance = await ethers.provider.getBalance(factory);

      const prevBalance = await ethers.provider.getBalance(clientAccount);
      await factory.addEvaluator(evaluatorAccount.address);
      await factory.declineClaim(policyAddress, claimId);
      const newFactoryBalance = await ethers.provider.getBalance(factory);
      const newBalance = await ethers.provider.getBalance(clientAccount);

      expect(newBalance).to.be.equal(prevBalance);
      expect(newFactoryBalance).to.be.equal(prevFactoryBalance);
    });

    it('should add an evaluator', async () => {
      const { factory, evaluatorAccount } = await loadFixture(
        deployOneEtherFactoryFixture
      );

      await factory.addEvaluator(evaluatorAccount.address);
      const isClaimEvaluatorKnown = await factory.isClaimEvaluatorKnown(
        evaluatorAccount.address
      );
      expect(isClaimEvaluatorKnown).to.be.true;
    });

    it('should change evaluator value', async () => {
      const { factory, evaluatorAccount } = await loadFixture(
        deployOneEtherFactoryFixture
      );
      await factory.addEvaluator(evaluatorAccount.address);
      await factory.changeEvaluatorValue(evaluatorAccount.address, false);
      const isClaimEvaluatorKnown = await factory.isClaimEvaluatorKnown(
        evaluatorAccount.address
      );
      expect(isClaimEvaluatorKnown).to.be.false;
    });

    it('Should cancel a policy a receive the amount', async () => {
      const { factory, clientAccount } = await loadFixture(
        deployOneEtherFactoryFixture
      );

      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 12);
      const endDateSeconds: number = Math.floor(endDate.getTime() / 1000);
      await factory
        .connect(clientAccount)
        .createPolicy(JSON.stringify(PROPOSAL_DATA), endDateSeconds, {
          value: ethers.parseEther('1'),
        });

      const [policyAddress] = await factory
        .connect(clientAccount)
        .getPolicies();
      const cancelDate = endDate.setMonth(endDate.getMonth() - 6);
      const cancelDateSeconds: number = Math.floor(cancelDate / 1000);

      const initialBalance = await ethers.provider.getBalance(clientAccount);
      await time.increaseTo(cancelDateSeconds);
      await expect(
        factory.connect(clientAccount).cancelPolicy(policyAddress)
      ).to.emit(factory, 'PolicyCanceled');
      const finalBalance = await ethers.provider.getBalance(clientAccount);

      expect(finalBalance.toString().substring(0, 6)).to.be.equal(
        (initialBalance + ethers.parseEther('0.49')).toString().substring(0, 6)
      );
    });

    it('Should allow the company to cancel a policy', async () => {
      const { factory, clientAccount } = await loadFixture(
        deployOneEtherFactoryFixture
      );

      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 12);
      const endDateSeconds: number = Math.floor(endDate.getTime() / 1000);
      await factory
        .connect(clientAccount)
        .createPolicy(JSON.stringify(PROPOSAL_DATA), endDateSeconds, {
          value: ethers.parseEther('1'),
        });

      const [policyAddress] = await factory
        .connect(clientAccount)
        .getPolicies();
      const cancelDate = endDate.setMonth(endDate.getMonth() - 6);
      const cancelDateSeconds: number = Math.floor(cancelDate / 1000);

      const initialBalance = await ethers.provider.getBalance(clientAccount);
      await time.increaseTo(cancelDateSeconds);
      await expect(factory.cancelPolicy(policyAddress)).to.emit(
        factory,
        'PolicyCanceled'
      );
      const finalBalance = await ethers.provider.getBalance(clientAccount);

      expect(finalBalance.toString().substring(0, 6)).to.be.equal(
        (initialBalance + ethers.parseEther('0.49')).toString().substring(0, 6)
      );
    });
    it('Should not allow others to cancel the policy', async () => {
      const { factory, clientAccount, evaluatorAccount } = await loadFixture(
        deployOneEtherFactoryFixture
      );

      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 12);
      const endDateSeconds: number = Math.floor(endDate.getTime() / 1000);
      await factory
        .connect(clientAccount)
        .createPolicy(JSON.stringify(PROPOSAL_DATA), endDateSeconds, {
          value: ethers.parseEther('1'),
        });

      const [policyAddress] = await factory
        .connect(clientAccount)
        .getPolicies();
      const cancelDate = endDate.setMonth(endDate.getMonth() - 6);
      const cancelDateSeconds: number = Math.floor(cancelDate / 1000);

      await time.increaseTo(cancelDateSeconds);
      await expect(
        factory.connect(evaluatorAccount).cancelPolicy(policyAddress)
      ).to.be.revertedWith(
        'Just the policyholder of the policy is able to cancel it.'
      );
    });
  });
});
