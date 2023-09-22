import React from 'react';
import Grid from '@mui/material/Grid';
import ProposalCard from '../../../features/proposal/ProposalCard';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { authOptions } from '../../api/auth/[...nextauth]';
import {
  ProposalDto,
  getProposals,
} from '@insurechain/web/backend/data-access';
import { getServerSession } from 'next-auth/next';
import { Box, Container, Fade, Stack, Typography } from '@mui/material';
import EmptyState from '../../../features/proposal/empty-state';
import { BackLink } from '@insurechain/web/ui-elements';

export const getServerSideProps: GetServerSideProps<{
  proposals: ProposalDto[];
}> = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.access_token) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }
  console.log(session);
  const response = await getProposals(session.access_token as string);
  const proposals = response.data;
  return { props: { proposals } };
};

const Proposals = ({
  proposals,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Container maxWidth={'lg'} sx={{ my: 4 }}>
      <BackLink text="Back to dashboard" link="/dashboard" />
      <Grid
        container
        spacing={0}
        direction="column"
        marginY={3}
        marginX={'auto'}
        maxWidth="md"
      >
        <Grid item xs={3} marginX={3}>
          <Typography mb={4} variant="h5">
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
    </Container>
  );
};

export default Proposals;
