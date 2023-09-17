import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Divider, Typography } from '@mui/material';
import Lottie from 'lottie-react';
import animationData from '../../../public/lottie/83168-login-success.json';
import { ConnectorsMenu } from '@insurechain/web/blockchain';
import Box from '@mui/material/Box';
import { StyledLink } from '@insurechain/web/ui-elements';
type LoginProps = {
  redirect?: string;
  handleClose?: () => void;
};

const Login = ({ redirect, handleClose }: LoginProps) => {
  return (
    <>
      <Lottie
        width={'150px'}
        height={'150px'}
        style={{ width: '150px', margin: 'auto' }}
        animationData={animationData}
        autoPlay={true}
        loop={false}
      />
      <Stack spacing={4}>
        <Typography variant="body1">Connect your wallet to continue</Typography>
        <Box display="flex" justifyContent="center">
          <ConnectorsMenu />
        </Box>
        <Divider />
        <StyledLink
          textTransform={'none'}
          onClick={handleClose}
          href="/insurance-contract"
        >
          <Button>I&apos;ll do it later</Button>
        </StyledLink>
      </Stack>
    </>
  );
};

export default Login;
