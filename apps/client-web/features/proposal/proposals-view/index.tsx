import React from 'react';
import Grid from '@mui/material/Grid';
import ProposalCard from '../../../features/proposal/ProposalCard';
import { ProposalDto } from '@insurechain/web/backend/data-access';
import { Box, Fade, Stack, Typography } from '@mui/material';
import EmptyState from '../../../features/proposal/empty-state';
import { PageLayout } from '@insurechain/web/ui-elements';

type Props = {
  proposals: ProposalDto[];
};
const ProposalsView = ({ proposals }: Props) => {
  return (
    <PageLayout
      maxWidth="lg"
      backLink={{ text: 'Back to dashboard', link: '/dashboard' }}
    >
      <Grid
        container
        spacing={0}
        direction="column"
        marginY={3}
        marginX={'auto'}
        maxWidth="md"
      >
        <Grid item xs={3} marginX={3}>
          <Typography mb={4} variant="h4">
            Your proposals
          </Typography>

          {proposals.length ? (
            <Stack spacing={2} direction="row" useFlexGap flexWrap="wrap">
              {proposals.map((proposal, index) => (
                <Fade
                  in={true}
                  key={proposal.id}
                  style={{
                    transitionDelay: `${index * 400}ms`,
                    transitionDuration: '500ms',
                  }}
                >
                  <Box width={{ xs: '100%', sm: '320px', md: '270px' }}>
                    <ProposalCard proposal={proposal} />
                  </Box>
                </Fade>
              ))}
            </Stack>
          ) : (
            <EmptyState />
          )}
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default ProposalsView;
