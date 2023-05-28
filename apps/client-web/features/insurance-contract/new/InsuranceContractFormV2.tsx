import React from 'react';
import { Grid } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Step from './Step';
import RiskObject from './risk-object';

const InsuranceContractForm = () => {
  return (
    <Grid
      maxWidth={'sm'}
      container
      direction="column"
      alignItems={'center'}
      rowSpacing={3}
    >
      <Step title="About your car" icon={DirectionsCarIcon}>
        <RiskObject />
      </Step>{' '}
    </Grid>
  );
};

export default InsuranceContractForm;
