import { Button, Chip, Stack, Tooltip, styled, useTheme } from '@mui/material';
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

const StyledButton = styled(Button)(({ theme }) => ({
  width: '110px',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  color: 'text.primary',
  textTransform: 'capitalize',
  '&& > span': {
    margin: '0 !important',
  },
}));

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

  const { typography } = useTheme();

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
          spacing={3}
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
          <Stack direction={'row'} justifyContent={'center'} spacing={4}>
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
          </Stack>
          <Box>
            <Tooltip title="Your address" placement="top">
              <Typography
                display={{ xs: 'none', sm: 'block' }}
                fontWeight={600}
                mb={1}
                variant="h6"
              >
                {address}
              </Typography>
            </Tooltip>
            <Tooltip title="Your address" placement="top">
              <Typography
                mb={2}
                display={{ xs: 'block', sm: 'none' }}
                fontWeight={600}
                variant="h6"
              >
                {addressShortFormat}
              </Typography>
            </Tooltip>
            <Tooltip title="Your balance">
              <Chip
                variant="filled"
                color="primary"
                sx={{
                  fontWeight: 600,
                  fontSize: typography.body1.fontSize,
                  background:
                    'linear-gradient(160deg, #f4f269 0%, #80D0C7 50%, #5cb270 100%)',
                }}
                label={`${balance?.formatted} ${balance?.symbol}`}
              />
            </Tooltip>
          </Box>

          <Stack
            direction={'row'}
            spacing={2}
            display={'flex'}
            justifyContent={'center'}
          >
            <StyledButton
              startIcon={<ContentCopyIcon />}
              onClick={() => {
                copyToClipboard();
              }}
            >
              Copy address
            </StyledButton>
            <StyledButton
              startIcon={<LogoutIcon sx={{}} />}
              onClick={(e) => {
                e.preventDefault();
                logout();
                handleClose();
              }}
            >
              Disconnect
            </StyledButton>
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
