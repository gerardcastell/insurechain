import Button from '@mui/material/Button';
import Image from 'next/image';
import { useSiweAuth } from './useSiweAuth';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import AccountModal from './AccountModal';

const ConnectedSection = () => {
  const { connectorImageSrc, balance, addressShortFormat } = useSiweAuth();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <AccountModal open={open} handleClose={handleClose} />
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
    </>
  );
};

export default ConnectedSection;
