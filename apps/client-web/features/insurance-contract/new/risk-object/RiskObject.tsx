import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import VersionForm from './VersionForm';
import VersionList from './VersionList';
import CarPresenter from './CarPresenter';
import useProposalStore, { RiskObject } from '../../proposal-store';
import { VersionDto } from '@insurechain/web/backend/data-access';
import dayjs from 'dayjs';

const RiskObject = () => {
  const [setMakerAndModel, setCarVersion] = useProposalStore((state) => [
    state.setMakerAndModel,
    state.setCarVersion,
  ]);
  const riskObject = useProposalStore((state) => state.riskObject);
  const [versions, setVersions] = useState<VersionDto[]>();
  const onSubmitVersionForm = (data: {
    versions: VersionDto[];
    riskObject: Omit<RiskObject, 'version' | 'releaseDate' | 'retailPrice'>;
  }) => {
    setMakerAndModel(data.riskObject);
    setVersions(data.versions);
  };

  const onSelectVersion = (version: VersionDto) => {
    setCarVersion({
      ...version,
      releaseDate: dayjs(version.releaseDate).toDate(),
    });
  };

  const isVersionDefined = () =>
    riskObject.version && riskObject.releaseDate && riskObject.retailPrice;

  return (
    <Box>
      {!isVersionDefined ? (
        versions?.length ? (
          <VersionList versions={versions} onSelectVersion={onSelectVersion} />
        ) : (
          <VersionForm
            defaultValues={riskObject}
            onSubmit={onSubmitVersionForm}
          />
        )
      ) : (
        <CarPresenter data={riskObject} />
      )}
    </Box>
  );
};

export default RiskObject;
