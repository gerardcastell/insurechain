import React from 'react';
import Grid from '@mui/material/Grid';
import ProposalCard from '../../features/proposal/ProposalCard';
const Proposals = () => {
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
        <ProposalCard />
      </Grid>
    </Grid>
  );
};

export default Proposals;
