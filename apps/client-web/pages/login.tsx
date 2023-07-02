import { Container } from '@mui/material';
import React from 'react';
import Login from '../features/auth/login/Login';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const {
    query: { redirect },
  } = useRouter();
  return (
    <Container maxWidth="md">
      <Login redirect={redirect as string} />
    </Container>
  );
};

export default LoginPage;
