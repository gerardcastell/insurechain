import axios from '../axios';
import { PriceSellResponse } from './types';

export const getSellPrice = async (
  blockchainToken = 'ETH',
  currency = 'EUR'
): Promise<number> => {
  const apiResponse = await axios.get<PriceSellResponse>(
    `https://api.coinbase.com/v2/prices/${blockchainToken}-${currency}/sell`
  );
  return +apiResponse.data.data.amount;
};
