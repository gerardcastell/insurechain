import { useQuery } from '@tanstack/react-query';
import { axios } from '../lib/axios';
import InsuranceContractForm from '../features/insurance-contract';
import { Grid, Avatar, Box } from '@mui/material';
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
    <Grid
      sx={{ height: 'calc(100vh - 56px)' }}
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <InsuranceContractForm />
    </Grid>
  );
};

export default InsuranceContract;
