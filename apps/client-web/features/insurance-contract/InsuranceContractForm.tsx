import React, { useState } from 'react';
import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Step from './components/Step';
import RiskObject from './risk-object';
import useProposalStore from './proposal-store';
import RiskSubject from './risk-subject/RiskSubject';
import BadgeIcon from '@mui/icons-material/Badge';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  quote,
  saveProposal,
  SaveProposalBody,
} from '@insurechain/web/backend/data-access';
import Coverages from './coverages/Coverages';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import style from 'styled-jsx/style';
import { useRouter } from 'next/router';
import SuccessModal from './components/SuccessModal';
const InsuranceContractForm = () => {
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [riskObject, riskSubject, coverages, defineCoverages, switchCoverage] =
    useProposalStore((state) => [
      state.riskObject,
      state.riskSubject,
      state.coverages,
      state.defineCoverages,
      state.switchCoverage,
    ]);

  const isRiskObjectDefined =
    !!riskObject?.version && !!riskObject?.releaseDate;
  const isRiskSubjectDefined: boolean =
    !!riskSubject?.birthDate &&
    !!riskSubject?.name &&
    !!riskSubject?.documentNumber;

  const { data: quoteData } = useQuery({
    queryKey: ['quote', riskObject, riskSubject],
    queryFn: () => quote({ riskObject, riskSubject, coverages: [] }),
    enabled: isRiskObjectDefined && isRiskSubjectDefined,
    onSuccess: (data) => defineCoverages(data.data),
  });

  const {
    data: proposalData,
    isLoading,
    error,
    mutate,
  } = useMutation((data: SaveProposalBody) => saveProposal(data), {
    onSuccess: () => setOpenSuccessModal(true),
  });

  const router = useRouter();

  const navigateToProposal = () => {
    setOpenSuccessModal(false);
    router.push('/proposals');
  };

  const _saveProposal = () =>
    mutate({
      riskObject,
      riskSubject,
      coverages: coverages.filter((coverage) => coverage.selected),
    });
  const onSwitchCoverage = (id) => switchCoverage(id);

  const hasCoverages =
    coverages &&
    coverages.length > 0 &&
    coverages.find((coverage) => coverage.selected);
  console.log(error);
  return (
    <>
      <SuccessModal
        open={openSuccessModal}
        onClickRight={navigateToProposal}
        onClickLeft={() => router.push('/dashboard')}
      />
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
          <Step title="Coverages" icon={DataSaverOnIcon}>
            <>
              {quoteData && (
                <Coverages
                  coverages={coverages}
                  onSwitchCoverage={onSwitchCoverage}
                />
              )}
              <Button
                variant="contained"
                disabled={!hasCoverages}
                sx={{ float: 'right', marginTop: 2 }}
                onClick={_saveProposal}
              >
                {isLoading ? 'Loading...' : 'Save Proposal'}
              </Button>
            </>
          </Step>
        )}
      </Grid>
    </>
  );
};

export default InsuranceContractForm;