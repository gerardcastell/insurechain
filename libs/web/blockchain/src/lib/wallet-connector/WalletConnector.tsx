import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import ConnectorsMenu from './ConnectorsMenu';
import DisconnectButton from './DisconnectButton';
import { useSiweAuth } from './useSiweAuth';

export function WalletConnector() {
  const { isAuthenticated } = useSiweAuth();
  const [isClientSide, setIsClientSide] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined' && 'ethereum' in window) {
      setIsClientSide(true);
    } else {
      setIsClientSide(false);
    }
  }, []);
  if (!isClientSide) {
    return <Typography color={'red'}>Please install a wallet</Typography>;
  }
  return (
    <Stack spacing={2}>
      {isAuthenticated ? <DisconnectButton /> : <ConnectorsMenu />}
    </Stack>
  );
}
