/*
 * @jest-environment node
 */
const ganache = require('ganache');
const { ContractFactory, providers, utils } = require('ethers');
const { contracts } = require('../scripts/compile');
import { riskObject } from './fixtures/risk-object';
import { riskSubject } from './fixtures/risk-subject';
const web3Provider = new providers.Web3Provider(ganache.provider());
const factorySigner = web3Provider.getSigner(0);
const { abi, evm } = contracts['Policy_v2.sol'].Policy;
const endDate = new Date();
endDate.setDate(endDate.getDate() + 1);

let accounts;
let contract;
let factory;
let policyholderAddress;
let policyholderSigner;
let claim;
let expertSigner;

describe('Policy', () => {
  beforeEach(async () => {
    accounts = await web3Provider.listAccounts();
    policyholderSigner = web3Provider.getSigner(1);
    expertSigner = web3Provider.getSigner(2);
    policyholderAddress = await policyholderSigner.getAddress();
    factory = new ContractFactory(abi, evm.bytecode.object, factorySigner);
    contract = await factory.deploy(
      123,
      'Car',
      utils.parseEther('1'),
      policyholderAddress,
      endDate.getTime()
    );
    await contract.deployed();

    claim = {
      title: 'Car accident',
      expertAddress: accounts[2],
      incidentDate: Math.floor(Date.now() / 1000) - 86400,
      expenses: utils.parseEther('0.1'),
      approved: false,
      resolveDate: 0,
    };
  });
  it('deploys a contract', () => {
    expect(contract.address).toBeTruthy();
    expect(contract.deployTransaction).toBeTruthy();
  });

  it('should only allow the owner to cancel the policy', async function () {
    await expect(
      contract.connect(expertSigner).cancelPolicy()
    ).rejects.toThrowError('revert');

    await expect(
      contract.connect(policyholderSigner).cancelPolicy()
    ).resolves.not.toThrow();
  });
  it('should only allow the owner or insurance company to cancel the policy', async function () {
    await expect(
      contract.connect(factorySigner).cancelPolicy()
    ).resolves.not.toThrow();
  });

  it('should not allow to make a claim on a canceled policy', async function () {
    await contract.connect(policyholderSigner).cancelPolicy();

    await expect(
      contract.connect(policyholderSigner).makeClaim(2, claim)
    ).rejects.toThrowError('revert');
  });

  it('should only allow the owner to make a claim', async function () {
    await expect(
      contract.connect(policyholderSigner).makeClaim(1, claim)
    ).resolves.not.toThrow();

    await expect(
      contract.connect(factorySigner).makeClaim(2, claim)
    ).rejects.toThrowError('revert');

    await expect(
      contract.connect(factorySigner).makeClaim(3, claim)
    ).rejects.toThrowError('revert');
  });

  it('should allow the insurance company to approve a claim and it cant be declined afterwards', async function () {
    await contract.connect(policyholderSigner).makeClaim(4, claim);

    await expect(
      contract.connect(factorySigner).approveClaim(4, utils.parseEther('0.5'))
    ).resolves.not.toThrow();

    await expect(
      contract.connect(factorySigner).declineClaim(4)
    ).rejects.toThrowError('revert');
  });

  it('should allow the insurance company to decline a claim and it cant be approved afterwards', async function () {
    await contract.connect(policyholderSigner).makeClaim(4, claim);

    await expect(
      contract.connect(factorySigner).declineClaim(4)
    ).resolves.not.toThrow();

    await expect(
      contract.connect(factorySigner).approveClaim(4, utils.parseEther('0.5'))
    ).rejects.toThrowError('revert');
  });

  it('should not allow anyone else to approve or decline a claim', async function () {
    await contract.connect(policyholderSigner).makeClaim(5, claim);

    await expect(
      contract
        .connect(policyholderSigner)
        .approveClaim(5, utils.parseEther('0.5'))
    ).rejects.toThrowError('revert');

    await expect(
      contract.connect(policyholderSigner).declineClaim(5)
    ).rejects.toThrowError('revert');
  });

  it('should allow company to approve a claim', async function () {
    await contract.connect(policyholderSigner).makeClaim(5, claim);

    await expect(
      contract.connect(factorySigner).approveClaim(5, utils.parseEther('0.5'))
    ).resolves.not.toThrow();
  });

  it('should allow company to approve or decline a claim', async function () {
    await contract.connect(policyholderSigner).makeClaim(5, claim);

    await expect(
      contract.connect(factorySigner).declineClaim(5)
    ).resolves.not.toThrow();
  });

  it('should not allow company to create a claim', async function () {
    await expect(
      contract.connect(factorySigner).makeClaim(5, claim)
    ).rejects.toThrowError('revert');
  });

  it("should allow the owner or insurance company to get the owner's address", async function () {
    expect(await contract.getOwnerAddress()).toEqual(policyholderAddress);

    expect(
      await contract.connect(policyholderSigner).getOwnerAddress()
    ).toEqual(policyholderAddress);
  });
});
