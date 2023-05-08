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
  const response = await axios.get(
    'https://insurechain-backend.onrender.com/api/proposals/proposals'
  );
  return response;
};
