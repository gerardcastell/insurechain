import React, { useState } from 'react';
import FormRiskObject from './forms/risk-object';
import FormCarVersion from './forms/car-version';
import { Grid } from '@mui/material';
import { FormRiskObjectOutput } from './forms/risk-object/form';
import CardVersion from './forms/car-card';
import { VersionDto } from '@insurechain/web/backend/data-access';
const InsuranceContractForm = () => {
  const [versions, setVersions] = useState([]);
  const [carVersion, setCarVersion] = useState<VersionDto>({
    fuelType: 'gasoline',
    id: 39043,
    maker: 'AUDI',
    makerId: '00008',
    model: 'A1',
    modelId: '038',
    version: '1.0 TFSI ADRENALIN2',
    versionId: '0081',
    releaseDate: '2015-03-01',
    numberDoors: 3,
    power: 95,
    type: '100',
    subtype: 'PO',
    retailPrice: 22229,
  });

  const onSetUpRiskObject = (data: FormRiskObjectOutput) => {
    setVersions(data.versions);
  };

  const onReset = (resetVersions = false) => {
    setCarVersion(null);
    if (resetVersions) setVersions([]);
  };

  return carVersion ? (
    <CardVersion onReset={onReset} data={carVersion} />
  ) : (
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
