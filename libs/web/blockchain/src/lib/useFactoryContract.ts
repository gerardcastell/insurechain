import { ethers } from 'ethers';
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import ABI from './contracts/Factory.sol/Factory.json';
import { useSiweAuth } from './wallet-connector/useSiweAuth';
export const useFactoryContract = (date: number) => {
  const address = process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS as any;
  const { chainId } = useSiweAuth();

  const { config } = usePrepareContractWrite({
    address,
    chainId,
    abi: ABI.abi,
    functionName: 'createPolicy',
    args: [1, 'prueba', date],
    value: ethers.parseEther('1'),
  });

  const { write, data: contractData } = useContractWrite(config);
  const { data, isLoading, isSuccess } = useWaitForTransaction({
    hash: contractData?.hash,
  });

  const { data: getPolicies } = useContractRead({
    address,
    abi: ABI.abi,
    functionName: 'getUserPolicies',
    args: [1],
  });

  return { write, data, isLoading, isSuccess, getPolicies };
};
