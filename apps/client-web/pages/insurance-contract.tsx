import InsuranceContractForm from '../features/insurance-contract';
import { Grid } from '@mui/material';
const InsuranceContract = () => {
  return (
    <Grid
      sx={{ height: 'calc(100vh - 65px)', paddingY: 10 }}
      container
      direction="column"
      alignItems="center"
    >
      <Grid item>
        <InsuranceContractForm />
      </Grid>
    </Grid>
  );
};

export default InsuranceContract;
