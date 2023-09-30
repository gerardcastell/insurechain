import { ProposalDto } from '@insurechain/web/backend/data-access';
import { ethers } from 'ethers';
import { useMemo } from 'react';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import ABI from '../contracts/Factory.sol/Factory.json';
import { useSiweAuth } from '../wallet-connector/useSiweAuth';
import { useEtherUtils } from './useEtherUtils';

export const useFactoryContract = (
  monthAmount: number,
  proposalData: ProposalDto
) => {
  const address = process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS as any;
  const { chainId } = useSiweAuth();
  const { convertEurosToEthers } = useEtherUtils();
  const date = useMemo(() => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + monthAmount);
    return Math.floor(currentDate.getTime() / 1000);
  }, [monthAmount]);
  const proposalStr = useMemo(
    () => JSON.stringify(proposalData),
    [proposalData]
  );

  const ethersValue = useMemo(
    () =>
      convertEurosToEthers(
        monthAmount *
          proposalData.coverages.reduce(
            (acc, curr) => acc + curr.monthlyPremium,
            0
          )
      ).toString(),
    [proposalData, monthAmount, convertEurosToEthers]
  );

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address,
    chainId,
    abi: ABI.abi,
    functionName: 'createPolicy',
    args: [proposalStr, date],
    value: ethers.parseEther(ethersValue),
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
