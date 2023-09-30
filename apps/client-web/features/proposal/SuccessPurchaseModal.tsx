import { useRouter } from 'next/router';
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Lottie from 'lottie-react';
import animationData from '../../public/lottie/contract_handshake.json';

type Props = {
  address: `0x${string}`;
};
const SuccessPurchaseModal = ({ address }: Props) => {
  const router = useRouter();

  return (
    <Box>
      <Lottie
        // onConfigReady={() => setAnimationLoaded(true)}
        style={{ height: '160px', width: '160px', margin: 'auto' }}
        animationData={animationData}
        autoPlay={true}
        loop={false}
      />
      <Typography
        id="keep-mounted-modal-title"
        variant="h5"
        fontWeight={600}
        component="h2"
        sx={{ textAlign: 'center' }}
      >
        Policy purchased!
      </Typography>
      <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
        <Typography>
          Your policy has been created successfully in the blockchain.
          <br /> You will find it in your dashboard, where you can manage it.
        </Typography>
      </Typography>
      <Box
        sx={{ marginTop: 6 }}
        display={'flex'}
        justifyContent={'space-between'}
      >
        <Button onClick={() => router.push('/dashboard/proposals')}>
          Go to proposals
        </Button>
        <Button
          onClick={() => router.push(`/dashboard/policies/${address}`)}
          variant="contained"
        >
          Go to Policy
        </Button>
      </Box>
    </Box>
  );
};

export default SuccessPurchaseModal;
