import Button from '@mui/material/Button';
import Image from 'next/image';
import React from 'react';
import { useDisconnect } from 'wagmi';

const DisconnectButton = () => {
  const { disconnect } = useDisconnect();

  return (
    <Button
      endIcon={
        <Image
          src={'/icons/disconnect.png'}
          width={25}
          height={25}
          alt={'Disconnect plugin'}
        />
      }
      onClick={() => disconnect()}
      sx={{
        textTransform: 'none',
        background:
          'linear-gradient(43deg, rgb(65, 88, 208) 0%, rgb(200, 80, 192) 46%, rgb(255, 204, 112) 100%)',
      }}
      color="inherit"
    >
      Disconnect wallet
    </Button>
  );
};

export default DisconnectButton;
