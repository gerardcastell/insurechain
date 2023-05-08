import Axios from 'axios';
import convertKeysToCamelcase from 'camelcase-keys';

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
axios.interceptors.request.use((request) => {
  if (request.url?.includes('api.cleverea.com')) {
    request.headers[
      'tpauthorization'
    ] = `Bearer ${process.env.NEXT_PUBLIC_THIRD_PARTY_CAR_AUTH_TOKEN}`;
  }
  return request;
});

axios.interceptors.response.use((response) => {
  response.data = convertKeysToCamelcase(response.data);
  if (response.request.url?.includes('api.cleverea.com')) {
    response.data = response.data.data;
  }
  return response;
});

export default axios;
