import { AxiosResponse } from 'axios';
import axios from '../axios';
import { QuoteResponse, type QuoteBody } from './types';

export const signIn = async (email: string, password: string) => {
  const response = await axios.post('/auth/login', { email, password });
  return response;
};

export const signUp = async (email: string, password: string) => {
  const response = await axios.post('/auth/signup', { email, password });
  return response;
};

export const getProposals = async () => {
  const response = await axios.get('/proposals/proposals');
  return response;
};

export const quote = async (
  data: QuoteBody
): Promise<AxiosResponse<QuoteResponse>> => {
  const response = await axios.post<QuoteResponse>('/proposals/quote', data);
  return response;
};
