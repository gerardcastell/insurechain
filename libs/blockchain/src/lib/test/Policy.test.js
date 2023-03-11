/*
 * @jest-environment node
 */
const ganache = require('ganache');
const { ContractFactory, providers, utils } = require('ethers');
const { contracts } = require('../scripts/compile');
import { riskObject } from './fixtures/risk-object';
import { riskSubject } from './fixtures/risk-subject';
const web3Provider = new providers.Web3Provider(ganache.provider());
const signer = web3Provider.getSigner(0);

let accounts;
let contract;
let factory;
const { abi, evm } = contracts['Policy_v2.sol'].Policy;
const endDate = new Date();

beforeEach(async () => {
  const address = await signer.getAddress();
  riskSubject.holder = address;
  accounts = await web3Provider.listAccounts();

  factory = new ContractFactory(abi, evm.bytecode.object, signer);
  contract = await factory.deploy(
    12,
    'riskObject',
    1,
    accounts[1],
    endDate.getTime()
  );
  await contract.deployed();
});

describe('Policy', () => {
  it('deploys a contract', () => {
    expect(contract.address).toBeTruthy();
    expect(contract.deployTransaction).toBeTruthy();
  });
});
