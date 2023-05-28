import React, { PropsWithChildren, useState } from 'react';
import FormRiskObject from './forms/risk-object';
import FormCarVersion from './forms/car-version';
import { Grid, Paper } from '@mui/material';
import { FormRiskObjectOutput } from './forms/risk-object/form';
import CardVersion from './forms/car-card';
import { VersionDto, quote } from '@insurechain/web/backend/data-access';
import RiskSubject, { RiskSubjectData } from './forms/risk-subject/RiskSubject';

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
    setCarVersion({ ...data.riskObject } as any);
  };

  const onReset = (resetVersions = false) => {
    setCarVersion(null);
    if (resetVersions) setVersions([]);
  };

  const onSetUpRiskSubject = async (data: RiskSubjectData) => {
    console.log(data);
    const response = await quote({
      riskSubject: { ...data },
      riskObject: {
        ...carVersion,
        numberDoors: carVersion.numberDoors,
        purchaseDate: new Date(),
      },
    });
    console.log(response);
  };

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
        <RiskSubject onSubmit={onSetUpRiskSubject}></RiskSubject>
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
            onSelectVersion={(val) =>
              setCarVersion((prev) => ({ ...prev, ...val }))
            }
          ></FormCarVersion>
        )}
      </Grid>
    </Grid>
  );
};

export default InsuranceContractForm;
