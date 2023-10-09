import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import ABI from '../contracts/Factory.sol/Factory.json';
import { useSiweAuth } from '../wallet-connector/useSiweAuth';

export const useCancelPolicy = (policyAddress: `0x${string}`) => {
  const address = process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS as any;
  const { chainId } = useSiweAuth();

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address,
    chainId,
    abi: ABI.abi,
    functionName: 'cancelPolicy',
    args: [policyAddress],
  });

  const { write, data: contractData } = useContractWrite(config);
  const { isLoading, isSuccess, isError, error, data } = useWaitForTransaction({
    hash: contractData?.hash,
  });

  return {
    data,
    contractData,
    write,
    isError,
    error,
    isLoading,
    isSuccess,
    isPrepareError,
    prepareError,
  };
};
