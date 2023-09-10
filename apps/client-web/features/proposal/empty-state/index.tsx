import { Button, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import React from 'react';
import MuiLink from '@mui/material/Link';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const EmptyState = () => {
  const router = useRouter();
  return (
    <Stack spacing={2} alignItems={'center'}>
      <Typography variant="h6">
        You have not created any proposal yet
      </Typography>
      <Typography variant="body1">
        Create your first proposal to start and you will find it here
      </Typography>
      <Button
        variant="outlined"
        onClick={() => router.push('/insurance-contract')}
      >
        Create proposal
      </Button>
    </Stack>
  );
};

export default EmptyState;
