import { useReadPolicies } from '@insurechain/web/blockchain';
import { CircularProgress, Typography } from '@mui/material';
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
      {policiesAddresses?.map((address) => (
        <PolicyPreview key={address} address={address} />
      ))}
    </PageLayout>
  );
};
