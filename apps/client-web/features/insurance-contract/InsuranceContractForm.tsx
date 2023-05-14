import React, { useState } from 'react';
import FormRiskObject from './forms/risk-object';
import FormCarVersion from './forms/car-version';
import { Grid, Typography } from '@mui/material';
import { FormRiskObjectOutput } from './forms/risk-object/form';
const InsuranceContractForm = () => {
  const [versions, setVersions] = useState([]);

  const onSetUpRiskObject = (data: FormRiskObjectOutput) => {
    setVersions(data.versions);
    console.log(data);
  };

  return (
    <Grid
      container
      direction="column"
      alignItems={'center'}
      spacing={2}
      maxWidth="sm"
    >
      <Grid
        item
        sx={{ width: '100%' }}
        alignItems={'center'}
        direction={'column'}
      >
        {versions.length ? (
          <Typography textAlign={'center'}>Risk Object defined</Typography>
        ) : (
          <FormRiskObject onSubmit={onSetUpRiskObject}></FormRiskObject>
        )}
      </Grid>
      <Grid item>{versions && <FormCarVersion></FormCarVersion>}</Grid>
    </Grid>
  );
};

export default InsuranceContractForm;
