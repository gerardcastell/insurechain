import React, { useState } from 'react';
import SignInForm from '../sign-in/SignInForm';
import SignUpForm from '../sign-up/SignUpForm';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Divider, Typography } from '@mui/material';
import Lottie from 'lottie-react';
import animationData from '../../../public/lottie/83168-login-success.json';
import { useRouter } from 'next/navigation';

type LoginProps = {
  redirect?: string;
};

const Login = ({ redirect }: LoginProps) => {
  const [modeSignIn, setModeSignIn] = useState<boolean>(true);
  const router = useRouter();

  const handleOnSuccess = () => {
    router.push(redirect ?? '/dashboard');
  };
  return (
    <>
      <Lottie
        width={'200px'}
        height={'200px'}
        style={{ width: '200px', margin: 'auto' }}
        animationData={animationData}
        autoPlay={true}
        loop={false}
      />
      <Stack spacing={2}>
        <Typography variant="h6" component="h6">
          {modeSignIn
            ? 'Welcome back!'
            : 'Welcome to the Insurechain community'}
        </Typography>
        {modeSignIn ? (
          <SignInForm onSuccess={handleOnSuccess} />
        ) : (
          <SignUpForm onSuccess={handleOnSuccess} />
        )}

        <Divider />
        <Button onClick={() => setModeSignIn((prev) => !prev)}>
          {modeSignIn ? 'Create account' : 'I have an account'}
        </Button>
      </Stack>
    </>
  );
};

export default Login;
