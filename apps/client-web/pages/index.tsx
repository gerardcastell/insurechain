import { axios } from '@insurechain/web/backend/data-access';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { signIn, signOut } from 'next-auth/react';
import { Grid, Typography } from '@mui/material';
import CoverageCard from '../features/insurance-contract/coverages/CoverageCard';
import { Coverage } from '@prisma/client';
import { useState } from 'react';

export function Index() {
  const onClick = async () => {
    const res = await axios.get('/auth/profile');
    console.log(res);
  };

  const customSignIn = async () => {
    signIn('credentials', {
      email: 'gerard@email.com',
      password: '12345',
    });
  };

  const customSignOut = async () => {
    signOut();
  };
  const [state, setState] = useState(false);

  return (
    <Grid container spacing={4} justifyContent={'center'}>
      <Grid item>
        <Button variant="contained" onClick={customSignIn}>
          Sign In
        </Button>
      </Grid>
      <Grid item>
        <Button variant="text" onClick={customSignOut}>
          Sign Out
        </Button>
      </Grid>
      <Grid item>
        <Button variant="outlined" onClick={onClick}>
          Get Profile
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography paddingBottom={4} variant="h4">
          Sandbox
        </Typography>
        <Box margin={2} onClick={() => setState((prev) => !prev)}>
          <CoverageCard
            title="Third party liability"
            description="Compulsory coverage to circulate. It covers the compensation she is responsible for to damages caused to third parties in a traffic accident, both material and personal damages."
            monthlyPremium={691.51}
            selected={state}
            id={1}
            identifier={Coverage.third_party_liability}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Index;
