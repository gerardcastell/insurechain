import { Box } from '@mui/material';
import React from 'react';
import VersionForm from './VersionForm';
import VersionList from './VersionList';
import CarPresenter from './CarPresenter';

const RiskObject = () => {
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box>
      <VersionForm onSubmit={onSubmit} />
      <VersionList />
      <CarPresenter />
    </Box>
  );
};

export default RiskObject;
