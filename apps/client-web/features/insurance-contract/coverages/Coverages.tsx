import React from 'react';
import { CoverageType } from '../proposal-store';
import { Box, Stack } from '@mui/material';
import CoverageCard from './CoverageCard';

const Coverages = ({
  coverages,
  onSwitchCoverage,
}: {
  coverages: CoverageType[];
  onSwitchCoverage: (id: number) => void;
}) => {
  return (
    <Stack spacing={2}>
      {coverages.map((coverageProps) => (
        <Box
          key={coverageProps.id}
          onClick={() => onSwitchCoverage(coverageProps.id)}
        >
          <CoverageCard {...coverageProps} />
        </Box>
      ))}
    </Stack>
  );
};

export default Coverages;
