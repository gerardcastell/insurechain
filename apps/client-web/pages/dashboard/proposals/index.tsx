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

export const getServerSideProps: GetServerSideProps<{
  proposals: ProposalDto[];
}> = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);
  const response = await getProposals(session.access_token as string);
  const proposals = response.data;
  return { props: { proposals } };
};

const Proposals = ({
  proposals,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      sx={{ minHeight: '100vh' }}
      marginY={5}
    >
      <Grid item xs={3}>
        {proposals.map((proposal) => (
          <ProposalCard key={proposal.id} />
        ))}
      </Grid>
    </Grid>
  );
};

export default Proposals;
