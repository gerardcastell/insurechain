import Button from '@mui/material/Button';
import Image from 'next/image';
import { useSiweAuth } from './useSiweAuth';

const DisconnectButton = () => {
  const { logout } = useSiweAuth();
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
      onClick={(e) => {
        e.preventDefault();
        logout();
      }}
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
