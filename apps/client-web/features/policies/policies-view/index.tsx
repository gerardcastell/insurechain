import { useReadPolicies } from '@insurechain/web/blockchain';
import {
  Box,
  Button,
  CircularProgress,
  Fade,
  Stack,
  Typography,
} from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { PolicyPreview } from './PolicyPreview';
import { PageLayout as UiPageLayout } from '@insurechain/web/ui-elements';
import { useRouter } from 'next/router';

const PageLayout = ({ children }: PropsWithChildren) => {
  return (
    <UiPageLayout backLink={{ text: 'Back to dashboard', link: '/dashboard' }}>
      {children}
    </UiPageLayout>
  );
};

export const PoliciesView = () => {
  const {
    policiesAddresses,
    isError,
    isFetching,
  }: {
    policiesAddresses: `0x${string}`[];
    isError: boolean;
    isFetching: boolean;
  } = useReadPolicies() as unknown as {
    policiesAddresses: `0x${string}`[];
    isError: boolean;
    isFetching: boolean;
  };
  const router = useRouter();

  if (isError) {
    return (
      <PageLayout>
        <Typography color="red">
          Error ocurred while fetching user policies
        </Typography>
        ;
      </PageLayout>
    );
  }

  if (isFetching || !policiesAddresses) {
    return (
      <PageLayout>
        <CircularProgress />
      </PageLayout>
    );
  }

  if (policiesAddresses?.length === 0) {
    return (
      <PageLayout>
        <Stack spacing={2} alignItems={'center'}>
          <Typography variant="h6">
            You don&rsquo;t have any policies yet
          </Typography>
          <Typography variant="body1">
            Purchase your first policy to start and you will find it here
          </Typography>
          <Button
            variant="outlined"
            onClick={() => router.push('/dashboard/proposals')}
          >
            Purchase proposal
          </Button>
        </Stack>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Typography mb={4} variant="h4">
        Your policies
      </Typography>

      <Stack spacing={2} direction="row" useFlexGap flexWrap="wrap">
        {policiesAddresses?.map((address, index) => (
          <Fade
            in={true}
            key={address}
            style={{
              transitionDelay: `${index * 400}ms`,
              transitionDuration: '500ms',
            }}
          >
            <Box width={{ xs: '100%', sm: '320px', md: '255px' }}>
              <PolicyPreview address={address} />
            </Box>
          </Fade>
        ))}
      </Stack>
    </PageLayout>
  );
};
