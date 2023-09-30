import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
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
import { useRouter } from 'next/router';
import SuccessModal from './components/SuccessModal';
import Confetti, { useConfetti } from '../../components/confetti';
import { LoginModal } from '../auth';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { useSiweAuth } from '@insurechain/web/blockchain';

const InsuranceContractForm = () => {
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const { status } = useSession();
  const { isAuthConnected } = useSiweAuth();

  useEffect(() => {
    if (openLoginModal && isAuthConnected) {
      setOpenLoginModal(false);
    }
  }, [isAuthConnected, setOpenLoginModal, openLoginModal]);

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
    mutate,
  } = useMutation((data: SaveProposalBody) => saveProposal(data), {
    onSuccess: () => {
      stopAnimation();
      startAnimation();
      setOpenSuccessModal(true);
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  const router = useRouter();
  const { getInstance, startAnimation, stopAnimation } = useConfetti();

  const navigateToProposal = () => {
    setOpenSuccessModal(false);
    router.push(
      `/dashboard/proposals${
        proposalData.data.id ? '/' + proposalData.data.id : ''
      }`
    );
  };

  const _saveProposal = () => {
    if (status === 'authenticated') {
      mutate({
        riskObject,
        riskSubject,
        coverages: coverages.filter((coverage) => coverage.selected),
      });
    } else {
      setOpenLoginModal(true);
    }
  };

  const hasCoverages =
    coverages &&
    coverages.length > 0 &&
    coverages.find((coverage) => coverage.selected);

  return (
    <>
      <Confetti getInstance={getInstance} />
      <SuccessModal
        open={openSuccessModal}
        onClickRight={navigateToProposal}
        onClickLeft={() => router.push('/dashboard')}
      />
      <LoginModal
        open={openLoginModal}
        handleClose={() => setOpenLoginModal(false)}
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
                  onSwitchCoverage={switchCoverage}
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
