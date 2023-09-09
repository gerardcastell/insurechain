import Button from '@mui/material/Button';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Grid, Stack, Typography } from '@mui/material';
import Login from '../features/auth';
import Link from '../components/Link';
import { useConnect, useAccount, useDisconnect, useNetwork } from 'wagmi';
import { getChainId } from 'viem/dist/types/actions/public/getChainId';
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
  const { connect, data: connectData, connectors, error } = useConnect();
  const { data: session, status } = useSession();
  console.log({ session, status });
  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  console.log({ connectData, address });

  const handleLogin = async () => {
    try {
      const callbackUrl = '/protected';
      if (address) {
        signIn('credentials', { address: address, callbackUrl });
        return;
      }
      await connect({ connector: connectors[0] });
      if (error) {
        throw error;
      }
      // signIn('credentials', { address: account, callbackUrl });
    } catch (error) {
      window.alert(error);
    }
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
      <Grid item xs={4} maxWidth={300}>
        <Stack spacing={2}>
          {connectors?.map((connector) => (
            <>
              <Button
                key={connector.name + 'connect'}
                variant="contained"
                onClick={() => connect({ connector })}
              >
                Connect with {connector.name}
              </Button>
              {isConnected ? (
                <>
                  <Typography>Connected to {chain?.name}</Typography>
                  <Typography>Account: {address}</Typography>
                </>
              ) : null}
              <Button
                key={connector.name + 'disconnect'}
                variant="outlined"
                onClick={() => disconnect()}
              >
                Disconnect from {connector.name}
              </Button>
            </>
          ))}
        </Stack>
      </Grid>

      <Grid item xs={12} maxWidth={300}>
        <Typography paddingBottom={4} variant="h4">
          Sandbox
        </Typography>
        <Login />G
      </Grid>
    </Grid>
  );
}

export default Index;
