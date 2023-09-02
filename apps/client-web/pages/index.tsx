import Button from '@mui/material/Button';
import { signIn, signOut } from 'next-auth/react';
import { Grid, Typography } from '@mui/material';
import Login from '../features/auth';
import Link from '../components/Link';
export function Index() {
  const customSignIn = async () => {
    signIn('credentials', {
      email: 'gerard@email.com',
      password: '12345',
    });
  };

  const customSignOut = async () => {
    signOut({ redirect: false });
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
      <Grid>
        <Link href="/dashboard">Dashboard</Link>
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
