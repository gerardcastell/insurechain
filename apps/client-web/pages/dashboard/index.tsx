import React from 'react';
import { getSession } from 'next-auth/react';
import { StyledLink } from '@insurechain/web/ui-elements';
import { Container, Stack } from '@mui/material';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination:
          '/login' + context.resolvedUrl
            ? `?redirect=${context.resolvedUrl}`
            : '',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

const Dashboard = () => {
  return (
    <Container maxWidth={'md'} sx={{ my: 4 }}>
      <Stack spacing={2}>
        <StyledLink href="/dashboard/policies">Policies</StyledLink>
        <StyledLink href="/dashboard/proposals">Proposals</StyledLink>
      </Stack>
    </Container>
  );
};

export default Dashboard;
