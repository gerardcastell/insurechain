import {
  ProposalDto,
  getProposal,
  getSellPrice,
} from '@insurechain/web/backend/data-access';
import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
// import PopoverOnHover from './PopoverOnHover';
import { useQuery } from '@tanstack/react-query';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../api/auth/[...nextauth]';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export const getServerSideProps: GetServerSideProps<{
  proposal: ProposalDto;
}> = async ({ req, res, params }) => {
  const session = await getServerSession(req, res, authOptions);
  const proposalId = params?.id as string;
  if (!session?.access_token) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }
  if (!proposalId) {
    return {
      redirect: {
        destination: '/dashboard/proposals',
        permanent: false,
      },
    };
  }

  console.log(proposalId);
  try {
    const response = await getProposal(
      proposalId,
      session.access_token as string
    );
    const proposal = response.data;
    return { props: { proposal } };
  } catch (e) {
    console.log(e);
    return {
      redirect: {
        destination: '/dashboard/proposals',
        permanent: false,
      },
    };
  }
};

const ProposalPage = ({
  proposal,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(proposal);
  const { isLoading, data: ethPrice } = useQuery({
    queryKey: ['getCurrency'],
    queryFn: () => getSellPrice(),
    cacheTime: 1000 * 60,
  });
  return (
    <Paper>
      <Grid container spacing={1} p={2} sx={{ width: '100%' }}>
        <Grid item xs={12}>
          <Typography fontWeight={500}>Proposal ID: {proposal.id}</Typography>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={6}>
            <Typography variant="body2" fontStyle={'oblique'}>
              Coverages
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              variant="body2"
              fontStyle={'oblique'}
              textAlign={'right'}
            >
              Monthly premium
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              variant="body2"
              fontStyle={'oblique'}
              textAlign={'right'}
            >
              Ethers
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          {proposal.coverages.map((coverage) => (
            <>
              <Grid item xs={6}>
                {/* <PopoverOnHover
                  text={coverage.title}
                  popoverText={coverage.description}
                /> */}
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body2" textAlign={'right'}>
                  {coverage.monthlyPremium.toLocaleString('es-ES')}€
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body2" textAlign={'right'}>
                  {(coverage.monthlyPremium / ethPrice).toFixed(5)}
                </Typography>
              </Grid>
            </>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProposalPage;
