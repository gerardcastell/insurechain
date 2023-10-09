import { useContractReads } from 'wagmi';
import ABI from '../contracts/Policy.sol/Policy.json';
import { useSiweAuth } from '../wallet-connector';

export const usePolicyContract = (address: `0x${string}`) => {
  const { chainId } = useSiweAuth();
  const contractConfig: any = { address, chainId, abi: ABI.abi };
  const { data, isError, isFetching, refetch } = useContractReads({
    contracts: [
      { ...contractConfig, functionName: 'getPremium', args: [] },
      { ...contractConfig, functionName: 'getStartDate', args: [] },
      { ...contractConfig, functionName: 'getEndDate', args: [] },
      { ...contractConfig, functionName: 'getRiskData', args: [] },
      { ...contractConfig, functionName: 'getIsActive', args: [] },
    ],
  });

  return { data, isError, isFetching, refetch };
};
