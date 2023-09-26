import { useContractRead } from 'wagmi';
import ABI from '../contracts/Factory.sol/Factory.json';

export const useReadPolicies = () => {
  const address = process.env
    .NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS as `0x${string}`;
  const {
    data: policiesAddresses,
    isFetching,
    isError,
  } = useContractRead({
    address,
    abi: ABI.abi,
    functionName: 'getUserPolicies',
    args: [1],
  });
  return { policiesAddresses, isError, isFetching };
};
