import { axios } from '@insurechain/web/backend/data-access';
import Button from '@mui/material/Button';
import { signIn, signOut } from 'next-auth/react';
import { Grid, Typography } from '@mui/material';
import Login from '../features/auth';

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
      <Grid item xs={12} maxWidth={300}>
        <Typography paddingBottom={4} variant="h4">
          Sandbox
        </Typography>
        <Login />
      </Grid>
    </Grid>
  );
}

export default Index;
