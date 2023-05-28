import React from 'react';
import { Grid } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Step from './components/Step';
import RiskObject from './risk-object';
import useProposalStore from './proposal-store';
import RiskSubject from './risk-subject/RiskSubject';
import BadgeIcon from '@mui/icons-material/Badge';
const InsuranceContractForm = () => {
  const [riskObject, riskSubject, coverages] = useProposalStore((state) => [
    state.riskObject,
    state.riskSubject,
    state.coverages,
  ]);

  const isRiskObjectDefined = riskObject?.version && riskObject?.releaseDate;
  const isRiskSubjectDefined =
    riskSubject?.birdDate && riskSubject?.name && riskSubject?.documentNumber;

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
      </Step>

      {isRiskObjectDefined && (
        <Step title="About you" icon={BadgeIcon}>
          <RiskSubject />
        </Step>
      )}
    </Grid>
  );
};

export default InsuranceContractForm;
