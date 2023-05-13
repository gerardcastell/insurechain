import Axios from 'axios';
import convertKeysToCamelcase from 'camelcase-keys';
import convertKeysToSnakecase from 'snakecase-keys';

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
axios.interceptors.request.use((request) => {
  if (request.url?.includes('api.cleverea.com')) {
    request.headers[
      'tpauthorization'
    ] = `Bearer ${process.env.NEXT_PUBLIC_THIRD_PARTY_CAR_AUTH_TOKEN}`;
    if (request.data) {
      request.data = convertKeysToSnakecase(request.data, { deep: true });
    }
  }
  return request;
});

axios.interceptors.response.use((response) => {
  if (response.request.responseURL?.includes('api.cleverea.com')) {
    response.data = convertKeysToCamelcase(response.data, { deep: true });
    response.data = response.data.data;
  }
  return response;
});

export default axios;
