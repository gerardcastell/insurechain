import { useCancelPolicy } from '@insurechain/web/blockchain';
import { StyledModal, StyledModalProps } from '@insurechain/web/ui-elements';
import { Box, Button, Stack, Typography } from '@mui/material';
import { BigNumberish, formatEther } from 'ethers';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';

type Props = {
  startDate: Date;
  endDate: Date;
  premium: BigNumberish;
  onSuccessCancel: () => void;
} & StyledModalProps;

const CancelModal = (props: Props) => {
  const { startDate, endDate, premium } = props;
  const { query } = useRouter();
  const { write, isSuccess } = useCancelPolicy(query?.id as `0x${string}`);

  const timePercentage = useMemo(() => {
    const today = new Date();
    const now = today.getTime();
    const start = startDate.getTime();
    const end = endDate.getTime();
    const timePercentage = ((end - now) / (end - start)) * 100;
    return timePercentage;
  }, [startDate, endDate]);

  useEffect(() => {
    if (isSuccess && props.open) {
      toast.success('Policy cancelled successfully');
      props.onSuccessCancel();
      props.handleClose();
    }
  }, [isSuccess, props]);

  const refund = useMemo(() => {
    const value = (Number(timePercentage) / 100) * Number(premium);
    return value > 0 ? value : 0;
  }, [timePercentage, premium]);
  const today = new Date();

  return (
    <StyledModal {...props}>
      {isSuccess ? (
        <Stack spacing={3} alignItems={'center'}>
          <Image
            src="/images/cancel.png"
            alt="Cancel"
            width={100}
            height={100}
          />
          <Typography fontWeight={500}>
            Policy cancelled successfully
          </Typography>
          <Button variant="contained" onClick={props.handleClose}>
            Accept
          </Button>
        </Stack>
      ) : (
        <>
          <Typography variant="h5" mb={2}>
            Cancel Policy
          </Typography>
          <Typography variant="body1" mb={1}>
            If you proceed, you will receive a refund according to the
            proportional time left on your policy from today{' '}
            <b>({today.toLocaleDateString('en-GB')}</b>) until the end date{' '}
            <b>({endDate.toLocaleDateString('en-GB')})</b>.
          </Typography>
          <Typography variant="body1" mb={2}>
            So you have not been covered yet for the{' '}
            {timePercentage.toPrecision(5)}% of the settled duration of your
            policy. Therefore, you will receive an estimated refund of{' '}
            <b>{formatEther(refund?.toString())} ETH</b>
          </Typography>
          <Typography variant="body1" mb={6}>
            Are you sure you want to cancel this policy?
          </Typography>
          <Box display={'flex'} justifyContent={'space-around'}>
            <Button variant="contained" onClick={props.handleClose}>
              No, keep it
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                write?.();
              }}
            >
              Yes, cancel it
            </Button>
          </Box>
        </>
      )}
    </StyledModal>
  );
};

export default CancelModal;
