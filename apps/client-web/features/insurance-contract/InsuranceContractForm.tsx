import React, { PropsWithChildren, useState } from 'react';
import FormRiskObject from './forms/risk-object';
import FormCarVersion from './forms/car-version';
import { Box, Grid, Paper } from '@mui/material';
import { FormRiskObjectOutput } from './forms/risk-object/form';
import CardVersion from './forms/car-card';
import { VersionDto } from '@insurechain/web/backend/data-access';
import RiskSubject from './forms/risk-subject/RiskSubject';

const FormElement = ({ children }: PropsWithChildren) => (
  <Grid item width="100%">
    <Paper elevation={8} sx={{ padding: 2 }}>
      {children}{' '}
    </Paper>
  </Grid>
);

const InsuranceContractForm = () => {
  const [versions, setVersions] = useState([]);
  const [carVersion, setCarVersion] = useState<VersionDto>();

  const onSetUpRiskObject = (data: FormRiskObjectOutput) => {
    setVersions(data.versions);
  };

  const onReset = (resetVersions = false) => {
    console.log(resetVersions);
    setCarVersion(null);
    if (resetVersions) setVersions([]);
  };
  console.log(versions.length);

  return carVersion ? (
    <Grid
      maxWidth={'sm'}
      container
      direction="column"
      alignItems={'center'}
      rowSpacing={3}
    >
      <FormElement>
        <CardVersion onReset={() => onReset()} data={carVersion} />
      </FormElement>
      <FormElement>
        <RiskSubject></RiskSubject>
      </FormElement>
    </Grid>
  ) : (
    <Grid
      container
      direction="column"
      alignItems={'center'}
      spacing={2}
      maxWidth="sm"
    >
      <Grid item sx={{ width: '100%' }}>
        {!Boolean(versions?.length).valueOf() && (
          <FormRiskObject onSubmit={onSetUpRiskObject}></FormRiskObject>
        )}
      </Grid>

      <Grid item>
        {!!versions.length && (
          <FormCarVersion
            versions={versions}
            onResetData={() => onReset(true)}
            onSelectVersion={setCarVersion}
          ></FormCarVersion>
        )}
      </Grid>
    </Grid>
  );
};

export default InsuranceContractForm;
