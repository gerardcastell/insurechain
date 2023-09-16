import { useAccount, useConnect, useDisconnect } from 'wagmi';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import ConnectorsMenu from './ConnectorsMenu';
import DisconnectButton from './DisconnectButton';

export function WalletConnector() {
  const { address, connector, isConnected } = useAccount();
  const [isClientSide, setIsClientSide] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined' && 'ethereum' in window) {
      setIsClientSide(true);
    } else {
      setIsClientSide(false);
    }
  }, []);
  console.log(address);
  if (!isClientSide) {
    return <Typography color={'red'}>Please install a wallet</Typography>;
  }
  return (
    <Stack spacing={2}>
      {isConnected ? <DisconnectButton /> : <ConnectorsMenu />}
    </Stack>
  );
}
