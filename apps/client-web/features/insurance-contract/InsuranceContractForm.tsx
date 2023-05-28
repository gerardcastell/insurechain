import React, { useCallback, useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Step from './components/Step';
import RiskObject from './risk-object';
import useProposalStore from './proposal-store';
import RiskSubject from './risk-subject/RiskSubject';
import BadgeIcon from '@mui/icons-material/Badge';
import { useMutation } from '@tanstack/react-query';
import { type QuoteBody, quote } from '@insurechain/web/backend/data-access';
import Coverages from './coverages/Coverages';
import { Coverage } from '@prisma/client';
const InsuranceContractForm = () => {
  const [riskObject, riskSubject, coverages, defineCoverages, switchCoverage] =
    useProposalStore((state) => [
      state.riskObject,
      state.riskSubject,
      state.coverages,
      state.defineCoverages,
      state.switchCoverage,
    ]);
  const { isLoading, data, mutate } = useMutation(
    (data: QuoteBody) => quote(data),
    { onSuccess: (data) => defineCoverages(data.data) }
  );

  const quoteData = useCallback(
    (coverages: Coverage[] = []) =>
      mutate({ riskObject, riskSubject, coverages }),
    [mutate, riskObject, riskSubject]
  );

  const isRiskObjectDefined = riskObject?.version && riskObject?.releaseDate;
  const isRiskSubjectDefined =
    riskSubject?.birthDate && riskSubject?.name && riskSubject?.documentNumber;

  const onSwitchCoverage = (id) => switchCoverage(id);
  // useEffect(() => {
  //   console.log(isRiskObjectDefined, isRiskSubjectDefined);
  //   if (isRiskObjectDefined && isRiskSubjectDefined) {
  //     // quoteData();
  //   }
  // }, [isRiskObjectDefined, isRiskSubjectDefined]);

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

      {isRiskObjectDefined && isRiskSubjectDefined && (
        <Step title="Coverages" icon={BadgeIcon}>
          {data && (
            <>
              <Coverages
                coverages={coverages}
                onSwitchCoverage={onSwitchCoverage}
              />
            </>
          )}
          <Button variant="contained" onClick={() => quoteData()}>
            {isLoading ? 'Loading...' : 'Quote'}
          </Button>
        </Step>
      )}
    </Grid>
  );
};

export default InsuranceContractForm;
