import { useReadPolicies } from '@insurechain/web/blockchain';
import { Box, CircularProgress, Fade, Stack, Typography } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { PolicyPreview } from './PolicyPreview';
import {
  StyledLink,
  PageLayout as UiPageLayout,
} from '@insurechain/web/ui-elements';

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

  if (isError) {
    <PageLayout>
      <Typography color="red">
        Error ocurred while fetching user policies
      </Typography>
      ;
    </PageLayout>;
  }

  if (isFetching || !policiesAddresses) {
    <PageLayout>
      <CircularProgress />
    </PageLayout>;
  }

  if (!policiesAddresses?.length) {
    <PageLayout>
      <Typography>You don&apost have any policies yet</Typography>
      <StyledLink href="/dashboard/proposals">
        Purchase your first proposal
      </StyledLink>
    </PageLayout>;
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
            <Box width={{ xs: '100%', sm: '320px', md: '270px' }}>
              <PolicyPreview address={address} />
            </Box>
          </Fade>
        ))}
      </Stack>
    </PageLayout>
  );
};
