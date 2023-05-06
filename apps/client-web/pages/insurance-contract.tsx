import { useQuery } from '@tanstack/react-query';
import { axios } from '../lib/axios';
import Form from '../features/insurance-contract/forms';
const InsuranceContract = () => {
  const { isLoading, isError, data } = useQuery(
    ['health'],
    async () => await axios.get('health')
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error...</div>;
  }
  return (
    <div>
      <Form />
    </div>
  );
};

export default InsuranceContract;
