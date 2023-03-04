/*
 * @jest-environment node
 */
const ganache = require('ganache');
const { ContractFactory, providers } = require('ethers');
const { abi, evm } = require('../scripts/compile');
import { riskObject } from './fixtures/risk-object';
import { riskSubject } from './fixtures/risk-subject';
const web3Provider = new providers.Web3Provider(ganache.provider());
const signer = web3Provider.getSigner(0);

let accounts;
let contract;
let factory;

beforeEach(async () => {
  const address = await signer.getAddress();
  riskSubject.holder = address;
  accounts = await web3Provider.listAccounts();

  factory = new ContractFactory(abi, evm.bytecode.object, signer);
  contract = await factory.deploy(riskSubject, riskObject);
  await contract.deployed();
});

describe('Policy', () => {
  it('deploys a contract', () => {
    expect(contract.address).toBeTruthy();
    expect(contract.deployTransaction).toBeTruthy();
  });
});
