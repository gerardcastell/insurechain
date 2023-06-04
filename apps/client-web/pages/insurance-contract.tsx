import InsuranceContractForm from '../features/insurance-contract';
import { Grid } from '@mui/material';
const InsuranceContract = () => {
  return (
    <Grid
      sx={{ height: 'calc(100vh - 56px)' }}
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <InsuranceContractForm />
      </Grid>
    </Grid>
  );
};

export default InsuranceContract;
