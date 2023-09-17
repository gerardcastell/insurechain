import { Button, Stack, Tooltip, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useSiweAuth } from './useSiweAuth';
import Image from 'next/image';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { toast } from 'react-toastify';
import LogoutIcon from '@mui/icons-material/Logout';
type Props = {
  open: boolean;
  handleClose: () => void;
};

const AccountModal = ({ open, handleClose }: Props) => {
  const { breakpoints } = useTheme();
  const {
    addressShortFormat,
    address,
    balance,
    chainName,
    connectorImageSrc,
    chainImageSrc,
    connectorName,
    logout,
  } = useSiweAuth();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address || '');
    toast.success('Copied to clipboard');
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      disableEnforceFocus={true}
      closeAfterTransition
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Stack
          spacing={2}
          sx={{
            ...style,
            [breakpoints.up('sm')]: {
              width: 700,
            },
            [breakpoints.down('sm')]: {
              width: '90vw',
            },
          }}
        >
          <Box>
            <Tooltip title={`Connected with ${connectorName}`}>
              <Image
                src={connectorImageSrc}
                alt="Connector logo"
                width={50}
                height={50}
              />
            </Tooltip>
            <Tooltip title={`Connected to ${chainName}`}>
              <Image
                src={chainImageSrc}
                alt="Chain logo"
                width={50}
                height={50}
              />
            </Tooltip>
          </Box>
          <Box>
            <Typography
              display={{ xs: 'none', sm: 'block' }}
              fontWeight={800}
              variant="h6"
            >
              {address}
            </Typography>
            <Typography
              display={{ xs: 'block', sm: 'none' }}
              fontWeight={800}
              variant="h6"
            >
              {addressShortFormat}
            </Typography>
            <Typography fontWeight={500}>
              {balance?.formatted} {balance?.symbol}
            </Typography>
          </Box>

          <Stack
            direction={'row'}
            spacing={4}
            display={'flex'}
            justifyContent={'center'}
          >
            <Button
              sx={{
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                color: 'text.primary',
                textTransform: 'capitalize',
              }}
              startIcon={<ContentCopyIcon />}
              onClick={() => {
                copyToClipboard();
              }}
            >
              Copy address
            </Button>
            <Button
              sx={{
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                color: 'text.primary',
                textTransform: 'capitalize',
              }}
              startIcon={<LogoutIcon />}
              onClick={(e) => {
                e.preventDefault();
                logout();
                handleClose();
              }}
            >
              Disconnect
            </Button>
          </Stack>
        </Stack>
      </Slide>
    </Modal>
  );
};

const style = {
  position: 'absolute',
  textAlign: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) !important',
  width: 400,
  bgcolor: 'grey.100',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  '&:focus-visible': {
    outline: 'none',
  },
};

export default AccountModal;
