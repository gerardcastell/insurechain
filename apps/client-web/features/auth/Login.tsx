import React, { useState } from 'react';
import SignInForm from './sign-in/SignInForm';
import SignUpForm from './sign-up/SignUpForm';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import PersonPinIcon from '@mui/icons-material/PersonPin';

const Login = () => {
  const [modeSignIn, setModeSignIn] = useState<boolean>(true);
  return (
    <Stack spacing={2}>
      <Box display="flex">
        <PersonPinIcon fontSize="large" />
        <Typography variant="h5" marginLeft={1} marginBottom={2}>
          {modeSignIn
            ? 'Welcome back!'
            : 'Welcome to the Insurechain community'}
        </Typography>
      </Box>
      {modeSignIn ? <SignInForm /> : <SignUpForm />}
      <Button onClick={() => setModeSignIn((prev) => !prev)}>
        {modeSignIn ? 'Create account' : 'I have an account'}
      </Button>
    </Stack>
  );
};

export default Login;
