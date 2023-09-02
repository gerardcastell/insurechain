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
import { Stack, Typography } from '@mui/material';

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
  const response = await getProposals(session.access_token as string);
  const proposals = response.data;
  return { props: { proposals } };
};

const Proposals = ({
  proposals,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(proposals);
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      marginY={5}
      marginX={'auto'}
      maxWidth="md"
    >
      <Grid item xs={3} marginX={3}>
        <Typography variant="h5">List of proposals</Typography>
        <Stack spacing={2}>
          {proposals.map((proposal) => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Proposals;
