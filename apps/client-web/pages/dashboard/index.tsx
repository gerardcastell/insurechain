import React from 'react';
import { getSession } from 'next-auth/react';
import { Box, Container, Stack, Typography, styled } from '@mui/material';
import { useRouter } from 'next/router';
import Image from 'next/image';
const IMAGE_SIZE_PX = 100;

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

const Card = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[2],
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '200px',
  transition: 'transform 0.2s ease-in-out',

  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const Dashboard = () => {
  const router = useRouter();
  return (
    <Container maxWidth={'md'} sx={{ my: 4 }}>
      <Stack
        spacing={{ xs: 2, md: 4 }}
        direction={{ xs: 'column', md: 'row' }}
        justifyContent={'center'}
      >
        <Card
          onClick={() => router.push('/dashboard/policies')}
          sx={{
            backgroundImage:
              'linear-gradient(43deg, rgb(65, 88, 208) 0%, #60efff 46%, #00ff87 100%)',
          }}
        >
          <Image
            src="/icons/car-insurance.png"
            width={IMAGE_SIZE_PX}
            height={IMAGE_SIZE_PX}
            alt="Proposal handshake"
          />
          <Typography mt={2} color="white" variant="h6">
            Your policies
          </Typography>
        </Card>
        <Card
          onClick={() => router.push('/dashboard/proposals')}
          sx={{
            backgroundImage:
              'linear-gradient(43deg, #9dc4ed 0%, #f5ccd4 46%, #b8a4c9 100%)',
          }}
        >
          <Box ml={1}>
            <Image
              src="/icons/proposal-handshake.png"
              width={IMAGE_SIZE_PX}
              height={IMAGE_SIZE_PX}
              alt="Proposal handshake"
            />
          </Box>
          <Typography mt={2} color="white" variant="h6">
            Your proposals
          </Typography>
        </Card>
      </Stack>
    </Container>
  );
};

export default Dashboard;
