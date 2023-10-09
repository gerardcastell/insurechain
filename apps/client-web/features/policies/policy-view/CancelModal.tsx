import { useCancelPolicy } from '@insurechain/web/blockchain';
import { StyledModal, StyledModalProps } from '@insurechain/web/ui-elements';
import { Box, Button, Typography } from '@mui/material';
import { BigNumberish, formatEther } from 'ethers';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

type Props = {
  startDate: Date;
  endDate: Date;
  premium: BigNumberish;
} & StyledModalProps;

const CancelModal = (props: Props) => {
  const { startDate, endDate, premium } = props;
  const { query } = useRouter();

  const { write, isError, isLoading, isSuccess, data, error, prepareError } =
    useCancelPolicy(query?.id as `0x${string}`);
  console.log({ isError, isLoading, isSuccess, data, error, prepareError });

  const timePercentage = useMemo(() => {
    const today = new Date();
    const now = today.getTime();
    const start = startDate.getTime();
    const end = endDate.getTime();
    const timePercentage = ((end - now) / (end - start)) * 100;
    return timePercentage;
  }, [startDate, endDate]);

  const refund = useMemo(() => {
    return (Number(timePercentage) / 100) * Number(premium);
  }, [timePercentage, premium]);
  const today = new Date();
  return (
    <StyledModal {...props}>
      <Typography variant="h5" mb={2}>
        Cancel Policy
      </Typography>
      <Typography variant="body1" mb={1}>
        If you proceed, you will receive a refund according to the proportional
        time left on your policy from today{' '}
        <b>({today.toLocaleDateString('en-GB')}</b>) until the end date{' '}
        <b>({endDate.toLocaleDateString('en-GB')})</b>.
      </Typography>
      <Typography variant="body1" mb={2}>
        So you have not been covered yet for the {timePercentage.toPrecision(5)}
        % of the settled duration of your policy. Therefore, you will receive an
        estimated refund of <b>{formatEther(refund.toString())} ETH</b>
      </Typography>
      <Typography variant="body1" mb={6}>
        Are you sure you want to cancel this policy?
      </Typography>
      <Box display={'flex'} justifyContent={'space-around'}>
        <Button variant="contained" onClick={props.handleClose}>
          No, keep it
        </Button>
        <Button variant="outlined" color="error" onClick={() => write?.()}>
          Yes, cancel it
        </Button>
      </Box>
    </StyledModal>
  );
};

export default CancelModal;
