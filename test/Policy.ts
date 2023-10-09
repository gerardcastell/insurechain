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

  async function deployOneEtherPolicyFixture() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const ONE_ETHER = ethers.parseEther('1');
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 3);
    const endTime = Math.floor(currentDate.getTime() / 1000);

    const initialBalance = ONE_ETHER;

    // Contracts are deployed using the first signer/account by default
    const [insuranceAccount, clientAccount, evaluatorAccount] =
      await ethers.getSigners();

    const Policy = await ethers.getContractFactory('Policy');
    const policy = await Policy.deploy(
      JSON.stringify(PROPOSAL_DATA),
      initialBalance,
      clientAccount.address,
      endTime
    );
    const startTime = await time.latest();
    await policy.waitForDeployment();
    const clientPolicy = policy.connect(clientAccount);

    const claim = {
      title: 'Car accident',
      expertAddress: evaluatorAccount.address,
      incidentDate: Math.floor(Date.now() / 1000) - 86400,
      expenses: ethers.parseEther('0.1'),
      approved: false,
      resolveDate: 0,
      isResolved: false,
    };

    return {
      policy,
      clientPolicy,
      insuranceAccount,
      clientAccount,
      initialBalance,
      evaluatorAccount,
      endTime,
      startTime,
      claim,
    };
  }

  describe('Deployment', function () {
    it('Should set the right premium on creation', async function () {
      const { clientPolicy, policy, initialBalance } = await loadFixture(
        deployOneEtherPolicyFixture
      );
      expect(await clientPolicy.getPremium()).to.equal(initialBalance);
      expect(await policy.getPremium()).to.equal(initialBalance);
    });

    it('Should set the right owner on creation', async function () {
      const { clientPolicy, policy, clientAccount } = await loadFixture(
        deployOneEtherPolicyFixture
      );
      expect(await clientPolicy.getOwnerAddress()).to.equal(
        clientAccount.address
      );
      expect(await policy.getOwnerAddress()).to.equal(clientAccount.address);
    });

    it('Should set the right startTime on creation', async function () {
      const { clientPolicy, policy, startTime } = await loadFixture(
        deployOneEtherPolicyFixture
      );
      expect(await clientPolicy.getStartDate()).to.equal(startTime);
      expect(await policy.getStartDate()).to.equal(startTime);
    });

    it('Should set the right insuranceAddress on creation', async function () {
      const { clientPolicy, policy, insuranceAccount } = await loadFixture(
        deployOneEtherPolicyFixture
      );
      expect(await clientPolicy.insuranceAddress()).to.equal(
        insuranceAccount.address
      );
      expect(await policy.insuranceAddress()).to.equal(
        insuranceAccount.address
      );
    });

    it('Should set the right endTime on creation', async function () {
      const { clientPolicy, policy, endTime } = await loadFixture(
        deployOneEtherPolicyFixture
      );
      expect(await clientPolicy.getEndDate()).to.equal(endTime);
      expect(await policy.getEndDate()).to.equal(endTime);
    });

    it('Should set the right risk data on creation', async function () {
      const { clientPolicy, policy } = await loadFixture(
        deployOneEtherPolicyFixture
      );
      expect(await clientPolicy.getRiskData()).to.equal(
        JSON.stringify(PROPOSAL_DATA)
      );
      expect(await policy.getRiskData()).to.equal(
        JSON.stringify(PROPOSAL_DATA)
      );
    });

    it('Should has not claims on creation', async function () {
      const { clientPolicy, policy } = await loadFixture(
        deployOneEtherPolicyFixture
      );
      expect(await clientPolicy.getClaimsList()).to.have.length(0);
      expect(await policy.getClaimsList()).to.have.length(0);
    });

    it('Should not allow to call getters from nor company neither client accounts', async function () {
      const { policy, evaluatorAccount } = await loadFixture(
        deployOneEtherPolicyFixture
      );
      const externalAccountConnected = policy.connect(evaluatorAccount);
      await expect(externalAccountConnected.getClaimsList()).to.be.rejectedWith(
        'Just the policyholder or the insurance company can perform this action'
      );
      await expect(
        externalAccountConnected.getOwnerAddress()
      ).to.be.rejectedWith(
        'Just the policyholder or the insurance company can perform this action'
      );
      await expect(externalAccountConnected.getPremium()).to.be.rejectedWith(
        'Just the policyholder or the insurance company can perform this action'
      );
      await expect(externalAccountConnected.getStartDate()).to.be.rejectedWith(
        'Just the policyholder or the insurance company can perform this action'
      );
      await expect(externalAccountConnected.getEndDate()).to.be.rejectedWith(
        'Just the policyholder or the insurance company can perform this action'
      );
      await expect(externalAccountConnected.getRiskData()).to.be.rejectedWith(
        'Just the policyholder or the insurance company can perform this action'
      );
    });
  });
  describe('Policy actions', () => {
    it('Should allow just the owner to cancel the policy', async () => {
      const { policy, clientPolicy, evaluatorAccount } = await loadFixture(
        deployOneEtherPolicyFixture
      );

      await expect(
        policy.connect(evaluatorAccount).cancelPolicy()
      ).to.be.rejectedWith(
        'Just the policyholder or the insurance company can perform this action'
      );
      clientPolicy.cancelPolicy();
    });

    it('Should allow company also to cancel the policy, and just once', async () => {
      const { policy, evaluatorAccount } = await loadFixture(
        deployOneEtherPolicyFixture
      );

      policy.cancelPolicy();

      await expect(policy.cancelPolicy()).to.be.rejectedWith(
        'Policy is not active'
      );
    });

    it('Should not allow to make a claim on a canceled policy', async function () {
      const { clientPolicy, policy, claim } = await loadFixture(
        deployOneEtherPolicyFixture
      );
      await policy.cancelPolicy();

      await expect(clientPolicy.makeClaim(2, claim)).to.be.revertedWith(
        'Policy is not active'
      );
    });

    it('Should only allow the owner to make a claim', async function () {
      const { clientPolicy, policy, claim } = await loadFixture(
        deployOneEtherPolicyFixture
      );
      await expect(clientPolicy.makeClaim(1, claim));

      await expect(policy.makeClaim(2, claim)).to.be.revertedWith(
        'Just the policyholder can perform this action'
      );

      await expect(policy.makeClaim(3, claim)).to.be.revertedWith(
        'Just the policyholder can perform this action'
      );
    });

    it('Should allow the insurance company to approve a claim and it cant be declined afterwards', async function () {
      const { clientPolicy, policy, claim } = await loadFixture(
        deployOneEtherPolicyFixture
      );
      await clientPolicy.makeClaim(4, claim);

      await expect(policy.approveClaim(4, ethers.parseEther('0.5')));

      await expect(policy.declineClaim(4)).to.be.revertedWith(
        'Claim is already resolved'
      );
    });

    it('Should allow the insurance company to decline a claim and it cant be approved afterwards', async function () {
      const { clientPolicy, policy, claim } = await loadFixture(
        deployOneEtherPolicyFixture
      );
      await clientPolicy.makeClaim(4, claim);

      await expect(policy.declineClaim(4));

      await expect(
        policy.approveClaim(4, ethers.parseEther('0.5'))
      ).to.be.revertedWith('Claim is already resolved');
    });
    it('Should not allow anyone else to approve or decline a claim', async function () {
      const { clientPolicy, policy, claim } = await loadFixture(
        deployOneEtherPolicyFixture
      );
      await clientPolicy.makeClaim(5, claim);

      await expect(
        clientPolicy.approveClaim(5, ethers.parseEther('0.5'))
      ).to.be.rejectedWith(
        'Just the insurance company can perform this action'
      );

      await expect(clientPolicy.declineClaim(5));
    });

    it('Should allow company to approve a claim', async function () {
      const { clientPolicy, policy, claim } = await loadFixture(
        deployOneEtherPolicyFixture
      );
      await clientPolicy.makeClaim(5, claim);

      await expect(policy.approveClaim(5, ethers.parseEther('0.5')));
    });

    it('Should allow company to approve or decline a claim', async function () {
      const { clientPolicy, policy, claim } = await loadFixture(
        deployOneEtherPolicyFixture
      );
      await clientPolicy.makeClaim(5, claim);

      await expect(policy.declineClaim(5));
    });

    it('Should not allow company to create a claim', async function () {
      const { clientPolicy, policy, claim } = await loadFixture(
        deployOneEtherPolicyFixture
      );
      await expect(policy.makeClaim(5, claim));
    });
  });
});
