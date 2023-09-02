import {
  ProposalDto,
  getSellPrice,
} from '@insurechain/web/backend/data-access';
import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
// import PopoverOnHover from './PopoverOnHover';
import { useQuery } from '@tanstack/react-query';

type ProposalPageProps = {
  proposal: ProposalDto;
};

const ProposalPage = ({ proposal }: ProposalPageProps) => {
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
