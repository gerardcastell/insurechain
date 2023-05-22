import axios from './axios';

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

export const quote = async (data: any) => {
  const response = await axios.post('/proposals/quote', data);
  return response;
};
