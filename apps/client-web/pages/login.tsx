import { Box, Container, Grid } from '@mui/material';
import React from 'react';
import Login from '../features/auth/login/Login';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const {
    query: { redirect },
  } = useRouter();
  return (
    <Container maxWidth="sm">
      <Grid
        sx={{ height: 'calc(100vh - 65px)', paddingY: 10 }}
        container
        direction="column"
        alignItems="center"
      >
        <Grid item display="block" width="100%">
          <Login redirect={redirect as string} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
