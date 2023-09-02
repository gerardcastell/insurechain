import { AxiosResponse } from 'axios';
import axios from '../axios';
import {
  ProposalDto,
  QuoteResponse,
  SaveProposalBody,
  ProposalDto as SaveProposalDto,
  type QuoteBody,
} from './types';

export const signIn = async (email: string, password: string) => {
  const response = await axios.post('/auth/login', { email, password });
  return response;
};

export const signUp = async (email: string, password: string) => {
  const response = await axios.post('/auth/signup', { email, password });
  return response;
};

export const getProposals = (
  accessToken?: string
): Promise<AxiosResponse<ProposalDto[]>> => {
  return axios.get('/proposals', {
    headers: accessToken ? { authorization: `Bearer ${accessToken}` } : {},
  });
};

export const quote = async (
  data: QuoteBody
): Promise<AxiosResponse<QuoteResponse>> => {
  const response = await axios.post<QuoteResponse>('/proposals/quote', data);
  return response;
};

export const saveProposal = async (
  data: SaveProposalBody
): Promise<AxiosResponse<SaveProposalDto>> => {
  const response = await axios.post<SaveProposalDto>(
    '/proposals/save-proposal',
    data
  );
  return response;
};
