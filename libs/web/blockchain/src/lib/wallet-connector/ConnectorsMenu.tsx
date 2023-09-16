import { useConnect } from 'wagmi';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Box, IconButton, Menu, MenuItem, keyframes } from '@mui/material';
import { ICONS_MAP } from './contants';

const pulse = keyframes`
  0% {
    opacity: 0.3;
  }

  50% {
    opacity: 0.8;
  }

  100% {
    opacity: 0.3;
}`;

export function ConnectorsMenu() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchor(null);
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);
  return (
    <Box sx={{ position: 'relative' }}>
      <Button
        variant="outlined"
        color="inherit"
        onClick={handleOpenMenu}
        sx={{
          display: { xs: 'none', md: 'block' },
          textTransform: 'none',
          backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
          border: 'none',
          color: 'white',
          position: 'relative',
          zIndex: 1,
          '::before': {
            backgroundImage:
              'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            content: '""',
            width: '110%',
            height: '110%',
            position: 'absolute',
            zIndex: -1,
            borderRadius: '1em',
            filter: 'blur(20px)',
            animation: `${pulse} 3s linear infinite`,
          },
        }}
        endIcon={
          <Image
            src={'/icons/wallet-border.png'}
            width={30}
            height={30}
            alt={'Wallet Icon'}
          />
        }
      >
        Connect wallet
      </Button>
      <IconButton
        onClick={handleOpenMenu}
        sx={{
          width: '50px',
          height: '50px',
          display: { xs: 'block', md: 'none' },
          textTransform: 'none',
          border: 'none',
          color: 'white',
          position: 'relative',
          zIndex: 1,
          '::before': {
            backgroundImage:
              'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            content: '""',
            width: '110%',
            height: '110%',
            position: 'absolute',
            zIndex: -1,
            borderRadius: '1em',
            filter: 'blur(20px)',
            animation: `${pulse} 3s linear infinite`,
          },
        }}
      >
        <Image
          src={'/icons/wallet-border.png'}
          width={30}
          height={30}
          alt={'Wallet Icon'}
        />
      </IconButton>
      <Menu
        sx={{ mt: '45px' }}
        id="wallet-connectors-menu"
        anchorEl={anchor}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchor)}
        onClose={handleCloseMenu}
      >
        {connectors.map((connector) => (
          <MenuItem
            key={connector.id}
            onClick={() => {
              handleCloseMenu();
              connect({ connector });
            }}
          >
            <Stack spacing={2} direction={'row'} alignItems={'center'}>
              <Image
                src={ICONS_MAP[connector.name] || ICONS_MAP.default}
                width={30}
                height={30}
                alt={connector.name}
              />
              <Typography>
                {connector.name}
                {!connector.ready && ' (unsupported)'}
                {isLoading &&
                  connector.id === pendingConnector?.id &&
                  ' (connecting)'}
              </Typography>
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
export default ConnectorsMenu;
