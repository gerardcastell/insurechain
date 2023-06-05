import { Box, Button, Modal, Slide, Typography } from '@mui/material';
import React from 'react';

type Props = {
  open: boolean;
  onClickRight: () => void;
  onClickLeft: () => void;
};
const SuccessModal = ({ open, onClickLeft, onClickRight }: Props) => {
  return (
    <Modal
      disableEscapeKeyDown
      open={open}
      disableEnforceFocus={true}
      closeAfterTransition
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
      slotProps={{
        backdrop: {
          onClick: null,
          timeout: 500,
        },
      }}
    >
      {/* <Grow in={open} style={{ transformOrigin: '0 0 0' }}> */}
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Box sx={style}>
          <Typography
            id="keep-mounted-modal-title"
            variant="h5"
            fontWeight={600}
            component="h2"
            sx={{ textAlign: 'center' }}
          >
            Proposal created!
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            <Typography>
              Your proposal has been created successfully. You can see it in
              your dashboard.
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              If you like it, you can purchase it from there using your wallet.
            </Typography>
          </Typography>
          <Box
            sx={{ marginTop: 4 }}
            display={'flex'}
            justifyContent={'space-between'}
          >
            <Button onClick={onClickLeft}>Go to dashboard</Button>
            <Button onClick={onClickRight} variant="contained">
              See proposal
            </Button>
          </Box>
        </Box>
        {/* </Grow> */}
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
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  '&:focus-visible': {
    outline: 'none',
  },
};

export default SuccessModal;
