/*
 * @jest-environment node
 */
const ganache = require('ganache');
const {
  ContractFactory,
  providers,
  utils,
  Contract,
  provider,
} = require('ethers');
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
const Policy = contracts['Policy_v2.sol'].Policy;

describe('Factory', () => {
  beforeEach(async () => {
    const policyHolderAddress = await policyholderSigner.getAddress();
    riskSubject.holder = policyHolderAddress;
    accounts = await web3Provider.listAccounts();
    const companyBalance = await companySigner.getBalance();
    console.log('company balance', utils.formatEther(companyBalance));
    factory = new ContractFactory(abi, evm.bytecode.object, companySigner);
    contract = await factory.deploy({
      value: utils.parseEther('5.0'),
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
    expect(tx).toHaveLength(0);
    await expect(
      contract
        .connect(policyholderSigner)
        .createPolicy(123, 'car', Date.now() + 1000, {
          value: utils.parseEther('0.5'),
        })
    ).resolves.not.toThrow();
    const tx2 = await contract.getHolderPolicies(123);
    expect(tx2).toHaveLength(1);
  });

  it('should get user policies', async () => {
    await contract.createPolicy(123, 'car', Date.now() + 1000, {
      value: utils.parseEther('0.5'),
    });
    const policies = await contract.getUserPolicies(123);
    expect(policies).toHaveLength(1);
  });

  it('should renew a policy', async () => {
    const endDate = Date.now() + 1000;
    const policyAddress = await contract
      .connect(policyholderSigner)
      .createPolicy(123, 'car', endDate, {
        value: utils.parseEther('0.5'),
      });
    const addresses = await contract.getUserPolicies(123);

    const newEndDate = endDate + 86400;
    expect(addresses).toHaveLength(1);
    await expect(
      contract
        .connect(policyholderSigner)
        .renewPolicy(addresses[0], newEndDate, 100, {
          value: utils.parseEther('0.5'),
        })
    ).resolves.not.toThrow();
  });

  it('should approve a claim', async () => {
    const endDate = Date.now() + 1000;
    const claimId = 1;
    const claimExpenses = utils.parseEther('0.1');
    const evaluatorAddress = accounts[3];
    await contract
      .connect(policyholderSigner)
      .createPolicy(123, 'car', endDate, {
        value: claimExpenses,
      });
    const [policyAddress] = await contract.getUserPolicies(123);
    const prevBalance = await policyholderSigner.getBalance();
    await contract.addEvaluator(evaluatorAddress);
    await contract.approveClaim(policyAddress, claimId, claimExpenses);
    const newBalance = await policyholderSigner.getBalance();

    expect(+utils.formatEther(newBalance.sub(prevBalance))).toBeGreaterThan(
      +utils.formatEther(claimExpenses) * 0.99
    );
    expect(+utils.formatEther(newBalance.sub(prevBalance))).toBeLessThan(
      +utils.formatEther(claimExpenses) * 1.01
    );
  });

  it('should decline a claim', async () => {
    const endDate = Date.now() + 1000;
    const claimId = 1;
    const evaluatorAddress = accounts[3];
    await contract
      .connect(policyholderSigner)
      .createPolicy(123, 'car', endDate, {
        value: utils.parseEther('0.1'),
      });
    const [policyAddress] = await contract.getUserPolicies(123);
    const prevBalance = await policyholderSigner.getBalance();
    await contract.addEvaluator(evaluatorAddress);
    await contract.declineClaim(policyAddress, claimId);
    const newBalance = await policyholderSigner.getBalance();

    expect(+utils.formatEther(newBalance)).toBeGreaterThan(
      +utils.formatEther(prevBalance) * 0.99
    );
    expect(+utils.formatEther(newBalance)).toBeLessThan(
      +utils.formatEther(prevBalance) * 1.01
    );
  });

  it('should add an evaluator', async () => {
    await contract.addEvaluator(policyholderSigner.getAddress());
    const isClaimEvaluatorKnown = await contract.isClaimEvaluatorKnown(
      policyholderSigner.getAddress()
    );
    expect(isClaimEvaluatorKnown).toBeTruthy();
  });

  it('should change evaluator value', async () => {
    await contract.addEvaluator(policyholderSigner.getAddress());
    await contract.changeEvaluatorValue(policyholderSigner.getAddress(), false);
    const isClaimEvaluatorKnown = await contract.isClaimEvaluatorKnown(
      policyholderSigner.getAddress()
    );
    expect(isClaimEvaluatorKnown).toBeFalsy();
  });
});
