/*
 * @jest-environment node
 */
const ganache = require('ganache');
const { ContractFactory, providers, utils } = require('ethers');
const { contracts } = require('../scripts/compile');
import { riskObject } from './fixtures/risk-object';
import { riskSubject } from './fixtures/risk-subject';
const web3Provider = new providers.Web3Provider(ganache.provider());
const companySigner = web3Provider.getSigner(0);
const policyholderSigner = web3Provider.getSigner(0);

let accounts;
let contract;
let factory;
const { abi, evm } = contracts['Factory.sol'].Factory;

describe('Factory', () => {
  beforeEach(async () => {
    const policyHolderAddress = await policyholderSigner.getAddress();
    riskSubject.holder = policyHolderAddress;
    accounts = await web3Provider.listAccounts();

    factory = new ContractFactory(abi, evm.bytecode.object, companySigner);
    contract = await factory.deploy({
      value: utils.parseEther('2.0'),
    });
    await contract.deployed();
  });

  it('deploys a contract', () => {
    expect(contract.address).toBeTruthy();
    expect(contract.deployTransaction).toBeTruthy();
  });

  it('should create a policy', async () => {
    await expect(
      contract.connect(policyholderSigner).getHolderPolicies(123)
    ).resolves.not.toThrow();
    const tx = await contract.getHolderPolicies(123);
    expect(tx).toHaveProperty('length', 0);
    console.log(tx);
    await expect(
      contract
        .connect(policyholderSigner)
        .createPolicy(123, 'car', Date.now() + 1000, {
          value: utils.parseEther('0.5'),
        })
    ).resolves.not.toThrow();
    const tx2 = await contract.getHolderPolicies(123);
    expect(tx2).toHaveProperty('length', 1);
  });

  // it("should get user policies", async () => {
  //   await factory.createPolicy(123, "car", Date.now() + 1000, { value: ethers.utils.parseEther("0.5") });
  //   const policies = await factory.getUserPolicies(123);
  //   expect(policies).to.have.lengthOf(1);
  // });

  // it("should renew a policy", async () => {
  //   const endDate = Date.now() + 1000;
  //   const policyAddress = await factory.createPolicy(123, "car", endDate, { value: ethers.utils.parseEther("0.5") });
  //   const policyContract = new ethers.Contract(policyAddress, Policy.abi, policyholderSigner);
  //   const newEndDate = endDate + 86400;
  //   await expect(factory.renewPolicy(policyAddress, 1, ethers.utils.parseEther("0.5"))).to.emit(policyContract, "PolicyRenewed");
  //   expect(await policyContract.endDate()).to.equal(newEndDate);
  // });

  // it("should approve a claim", async () => {
  //   const claimId = 1;
  //   const claimExpenses = ethers.utils.parseEther("0.1");
  //   await factory.addEvaluator(policyholderSigner.address);
  //   await factory.approveClaim(policy.address, claimId, claimExpenses);
  //   expect(await provider.getBalance(policyholderSigner.address)).to.equal(claimExpenses);
  // });

  // it("should decline a claim", async () => {
  //   const claimId = 1;
  //   await factory.addEvaluator(policyholderSigner.address);
  //   await factory.declineClaim(policy.address, claimId);
  //   // Assert that the claim was declined
  // });

  // it("should add an evaluator", async () => {
  //   await factory.addEvaluator(policyholderSigner.address);
  //   expect(await factory.isClaimEvaluatorKnown(policyholderSigner.address)).to.be.true;
  // });

  // it("should change evaluator value", async () => {
  //   await factory.addEvaluator(policyholderSigner.address);
  //   await factory.changeEvaluatorValue(policyholderSigner.address, false);
  //   expect(await factory.isClaimEvaluatorKnown(policyholderSigner.address)).to.be.false;
  // });
});
