import { useContractReads } from 'wagmi';
import ABI from '../contracts/Policy.sol/Policy.json';
import { useSiweAuth } from '../wallet-connector';

export const usePolicyContract = (address: `0x${string}`) => {
  const { chainId } = useSiweAuth();
  const contractConfig: any = { address, chainId, abi: ABI.abi };
  const { data, isError, isFetching } = useContractReads({
    contracts: [
      { ...contractConfig, functionName: 'getOwnerAddress', args: [] },
      { ...contractConfig, functionName: 'getEndDate', args: [] },
    ],
  });

  return { data, isError, isFetching };
};
