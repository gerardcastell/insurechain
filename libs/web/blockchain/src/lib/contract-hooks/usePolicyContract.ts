import { useContractRead } from 'wagmi';
import ABI from '../contracts/Policy.sol/Policy.json';
import { useSiweAuth } from '../wallet-connector';

export const usePolicyContract = (address: `0x${string}`) => {
  const { chainId } = useSiweAuth();
  const { data: ownerAddress } = useContractRead({
    address,
    chainId,
    abi: ABI.abi,
    functionName: 'getOwnerAddress',
    args: [],
  });

  return { ownerAddress };
};
