import Button from '@mui/material/Button';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Grid, Stack, Typography } from '@mui/material';
import Login from '../features/auth';
import Link from '../components/Link';
import { useConnect, useAccount, useDisconnect, useNetwork } from 'wagmi';
import { getChainId } from 'viem/dist/types/actions/public/getChainId';
import { useEffect, useState } from 'react';
export function Index() {
  const { connect, data: connectData, connectors, error } = useConnect();
  const { data: session, status } = useSession();
  console.log({ session, status });
  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();
  const { address, isConnected, connector } = useAccount();
  console.log({ connectData, address });
  const [isClientSide, setIsClientSide] = useState(false);
  useEffect(() => {
    setIsClientSide(true);
  }, []);
  if (!isClientSide) {
    return <Typography>Please connect your wallet</Typography>;
  }
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
        <Typography variant="h4">
          Secure, Transparent, Smart: Your Insurance, Our Blockchain
        </Typography>
        <Typography variant="h6">
          Building trust, one block at a time
        </Typography>
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={handleLogin}>
          Sign In
        </Button>
      </Grid>
      <Grid item>
        <Button variant="text" onClick={() => signOut({ redirect: false })}>
          Sign Out
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={2}>
          {connectors?.map((connectorInstance) => (
            <Button
              key={connectorInstance.name + 'connect'}
              variant="contained"
              onClick={() => connect({ connector: connectorInstance })}
            >
              Connect with {connectorInstance.name}
            </Button>
          ))}
          {isConnected && connector ? (
            <>
              <Typography>Connected to {chain?.name}</Typography>
              <Typography>Account: {address}</Typography>
              <Button
                key={connector?.name + 'disconnect'}
                variant="outlined"
                onClick={() => disconnect()}
              >
                Disconnect from {connector?.name}
              </Button>
            </>
          ) : null}
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Index;
