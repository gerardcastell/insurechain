import { usePolicyContract } from '@insurechain/web/blockchain';
import {
  Box,
  Button,
  CircularProgress,
  Fade,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import React, { PropsWithChildren } from 'react';
import {
  StyledLink,
  PageLayout as UiPageLayout,
} from '@insurechain/web/ui-elements';
import { BigNumberish, formatEther } from 'ethers';
import { ProposalDto } from '@insurechain/web/backend/data-access';

const PageLayout = ({ children }: PropsWithChildren) => {
  return (
    <UiPageLayout
      backLink={{ text: 'Back to policies', link: '/dashboard/policies' }}
    >
      {children}
    </UiPageLayout>
  );
};
type Props = {
  address: `0x${string}`;
};

export const PolicyView = ({ address }: Props) => {
  const { data, isError, isFetching } = usePolicyContract(address);
  const [
    { result: premium },
    { result: startTime },
    { result: endTime },
    { result: policyData },
  ] = data;
  const policy: ProposalDto = JSON.parse(policyData as any);
  const startDate = new Date(1000 * Number(startTime));
  const endDate = new Date(1000 * Number(endTime));
  const ethersPaid = formatEther(premium as unknown as BigNumberish);

  if (isError) {
    <PageLayout>
      <Typography color="red">
        Error ocurred while fetching user policies
      </Typography>
      ;
    </PageLayout>;
  }

  if (isFetching) {
    <PageLayout>
      <CircularProgress />
    </PageLayout>;
  }

  if (!data) {
    <PageLayout>
      <Typography>You cannot access this policy</Typography>
      <StyledLink href="/dashboard/proposals">
        Purchase your first proposal
      </StyledLink>
    </PageLayout>;
  }

  return (
    <PageLayout>
      <Typography mb={4} variant="h4">
        Policy details
      </Typography>
      <Box display={'flex'} gap={2}>
        <Box flexBasis={{ xs: '100%', sm: '70%' }} flexGrow={1} flexShrink={0}>
          <Fade in={true}>
            <Paper>
              <Box width={'100%'} padding={2}>
                <Typography variant="h5">Policy details</Typography>
              </Box>
            </Paper>
          </Fade>
        </Box>
        <Stack
          flexBasis={{ xs: '100%', sm: '30%' }}
          flexGrow={1}
          flexShrink={0}
          spacing={2}
        >
          <Button variant="contained">Make a claim</Button>
          <Button variant="contained">Cancel policy</Button>
        </Stack>
      </Box>
    </PageLayout>
  );
};

export default PolicyView;
