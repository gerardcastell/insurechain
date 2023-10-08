import {
  loadFixture,
  time,
} from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
describe('Factory', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.

  async function deployOneEtherFactoryFixture() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const ONE_ETHER = ethers.parseEther('1');
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 1);
    const THREE_MONTHS_FROM_TODAY = Math.floor(currentDate.getTime() / 1000);

    const proposalData = {
      id: 3,
      policyHolderId: 2,
      riskSubjectId: 1,
      smartContractAddress: null,
      coverages: [
        {
          id: 13,
          identifier: 'third_party_liability',
          monthlyPremium: 10,
          title: 'Theft',
          description: 'Theft of the insured vehicle.',
          proposalId: 3,
        },
      ],
      riskObject: {
        id: 3,
        model: 'A1',
        power: 120,
        purchaseDate: '2018-02-01T00:00:00.000Z',
        plate: '1234LLC',
        kmsYear: 10000,
        numberDoors: 3,
        maker: 'AUDI',
        releaseDate: '2016-02-01T00:00:00.000Z',
        retailPrice: 20750,
        version: '1.0 TFSI ACTIVE KIT',
        fuelType: 'gasoline',
        parking: 'street',
        proposalId: 3,
      },
      riskSubject: {
        id: 1,
        name: 'Gerard Castell',
        documentNumber: '11111111H',
        birthDate: '1978-05-02T22:00:00.000Z',
      },
    };

    const initialBalance = ONE_ETHER;
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

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
      proposalData,
      THREE_MONTHS_FROM_TODAY,
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

    // it('Should receive and store the funds to lock', async function () {
    //   const { lock, lockedAmount } = await loadFixture(
    //     deployOneEtherFactoryFixture
    //   );

    //   expect(await ethers.provider.getBalance(lock.target)).to.equal(
    //     lockedAmount
    //   );
    // });

    // it('Should fail if the unlockTime is not in the future', async function () {
    //   // We don't use the fixture here because we want a different deployment
    //   const latestTime = await time.latest();
    //   const Lock = await ethers.getContractFactory('Lock');
    //   await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
    //     'Unlock time should be in the future'
    //   );
    // });
  });

  describe('Policy creation', () => {
    it('Should create new policy when paying an amount and retrieve it', async () => {
      const { factory, clientAccount, proposalData, initialBalance } =
        await loadFixture(deployOneEtherFactoryFixture);
      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() + 1);
      const date = Math.floor(currentDate.getTime() / 1000);

      const premium = ethers.parseEther('1');
      const clientInitialBalance = await ethers.provider.getBalance(
        clientAccount
      );

      expect(
        await factory.connect(clientAccount).getHolderPolicies()
      ).to.have.length(0);

      await expect(
        factory
          .connect(clientAccount)
          .createPolicy(JSON.stringify(proposalData), date)
      ).to.be.revertedWith('To create a policy you must pay a premium.');
      expect(
        await factory.connect(clientAccount).getHolderPolicies()
      ).to.have.length(0);

      await factory
        .connect(clientAccount)
        .createPolicy(JSON.stringify(proposalData), date, {
          value: premium,
        });

      expect(
        await factory.connect(clientAccount).getHolderPolicies()
      ).to.have.length(1);

      const balance = await ethers.provider.getBalance(factory.getAddress());
      expect(balance).to.equal(initialBalance + premium);

      expect(await ethers.provider.getBalance(clientAccount)).to.be.lessThan(
        clientInitialBalance - premium
      );
    });

    it('Should renew a policy', async () => {
      const { factory, clientAccount, proposalData, THREE_MONTHS_FROM_TODAY } =
        await loadFixture(deployOneEtherFactoryFixture);
      const endDate = Date.now() + 1000;

      const { data: policyAddress } = await factory
        .connect(clientAccount)
        .createPolicy(JSON.stringify(proposalData), endDate, {
          value: ethers.parseEther('1'),
        });

      const addresses = await factory
        .connect(clientAccount)
        .getHolderPolicies();

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
      const {
        factory,
        clientAccount,
        evaluatorAccount,
        proposalData,
        THREE_MONTHS_FROM_TODAY,
      } = await loadFixture(deployOneEtherFactoryFixture);
      const endDate = Date.now() + 1000;
      const claimId = 1;
      const claimExpenses = ethers.parseEther('0.1');
      await factory
        .connect(clientAccount)
        .createPolicy(JSON.stringify(proposalData), endDate, {
          value: claimExpenses,
        });
      const [policyAddress] = await factory
        .connect(clientAccount)
        .getHolderPolicies();
      const prevBalance = await ethers.provider.getBalance(clientAccount);
      await factory.addEvaluator(evaluatorAccount.address);
      await factory.approveClaim(policyAddress, claimId, claimExpenses);
      const newBalance = await ethers.provider.getBalance(clientAccount);

      expect(newBalance).to.be.equal(claimExpenses + prevBalance);
    });
  });
  it('should decline a claim', async () => {
    const {
      factory,
      clientAccount,
      evaluatorAccount,
      proposalData,
      THREE_MONTHS_FROM_TODAY,
    } = await loadFixture(deployOneEtherFactoryFixture);
    const endDate = Date.now() + 1000;
    const claimId = 1;
    const claimExpenses = ethers.parseEther('0.1');
    await factory
      .connect(clientAccount)
      .createPolicy(JSON.stringify(proposalData), endDate, {
        value: claimExpenses,
      });
    const [policyAddress] = await factory
      .connect(clientAccount)
      .getHolderPolicies();
    const prevFactoryBalance = await ethers.provider.getBalance(factory);

    const prevBalance = await ethers.provider.getBalance(clientAccount);
    await factory.addEvaluator(evaluatorAccount.address);
    await factory.declineClaim(policyAddress, claimId);
    const newFactoryBalance = await ethers.provider.getBalance(factory);
    const newBalance = await ethers.provider.getBalance(clientAccount);

    expect(newBalance).to.be.equal(prevBalance);
    expect(newFactoryBalance).to.be.equal(prevFactoryBalance);
  });

  // describe('Withdrawals', function () {
  //   describe('Validations', function () {
  //     it('Should revert with the right error if called too soon', async function () {
  //       const { lock } = await loadFixture(deployOneEtherFactoryFixture);

  //       await expect(lock.withdraw()).to.be.revertedWith(
  //         "You can't withdraw yet"
  //       );
  //     });

  //     it('Should revert with the right error if called from another account', async function () {
  //       const { lock, unlockTime, otherAccount } = await loadFixture(
  //         deployOneEtherFactoryFixture
  //       );

  //       // We can increase the time in Hardhat Network
  //       await time.increaseTo(unlockTime);

  //       // We use lock.connect() to send a transaction from another account
  //       await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
  //         "You aren't the owner"
  //       );
  //     });

  //     it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
  //       const { lock, unlockTime } = await loadFixture(
  //         deployOneEtherFactoryFixture
  //       );

  //       // Transactions are sent using the first signer by default
  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).not.to.be.reverted;
  //     });
  //   });

  //   describe('Events', function () {
  //     it('Should emit an event on withdrawals', async function () {
  //       const { lock, unlockTime, lockedAmount } = await loadFixture(
  //         deployOneEtherFactoryFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw())
  //         .to.emit(lock, 'Withdrawal')
  //         .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
  //     });
  //   });

  //   describe('Transfers', function () {
  //     it('Should transfer the funds to the owner', async function () {
  //       const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
  //         deployOneEtherFactoryFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).to.changeEtherBalances(
  //         [owner, lock],
  //         [lockedAmount, -lockedAmount]
  //       );
  //     });
  //   });
  // });
});
