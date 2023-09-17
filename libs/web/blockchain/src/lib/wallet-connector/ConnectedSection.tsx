import Button from '@mui/material/Button';
import Image from 'next/image';
import { useSiweAuth } from './useSiweAuth';
import Tooltip from '@mui/material/Tooltip';
import { CONNECTOR_ICON_MAP } from './contants';
import { useState } from 'react';
import AccountModal from './AccountModal';

const ConnectedSection = () => {
  const {
    logout,
    connectorImageSrc,
    connectorName,
    balance,
    addressShortFormat,
  } = useSiweAuth();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Tooltip title="Click to open options">
        <Button
          startIcon={
            <Image
              src={connectorImageSrc}
              width={25}
              height={25}
              alt={'Disconnect plugin'}
            />
          }
          onClick={(e) => {
            e.preventDefault();
            handleOpen();
            // logout();
          }}
          sx={{
            textTransform: 'none',
            background:
              'linear-gradient(160deg, #0093E9 0%, #80D0C7 50%, #3cd8a2 100%)',
          }}
          color="inherit"
        >
          {`${balance?.formatted} ${balance?.symbol}`} {addressShortFormat}
        </Button>
      </Tooltip>
      <AccountModal open={open} handleClose={handleClose} />
    </>
  );
};

export default ConnectedSection;
