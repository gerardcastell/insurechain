import { getSellPrice } from '@insurechain/web/backend/data-access';
import { useQuery } from '@tanstack/react-query';

export const useEtherUtils = () => {
  const { data: ethPrice } = useQuery({
    queryKey: ['getCurrency'],
    queryFn: () => getSellPrice(),
    staleTime: 1000 * 60,
  });

  const convertEurosToEthers = (amount: number): number => {
    return ethPrice ? amount / ethPrice : amount / 1500;
  };

  return { convertEurosToEthers, ethPrice };
};
