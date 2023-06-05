import { axios } from '@insurechain/web/backend/data-access';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { signIn, signOut } from 'next-auth/react';
import { Grid } from '@mui/material';

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
    <Grid container spacing={4} padding={4} justifyContent={'center'}>
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
    </Grid>
  );
}

export default Index;
