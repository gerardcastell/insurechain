import { Box, Modal, Slide, useTheme } from '@mui/material';
import { PropsWithChildren } from 'react';

type Props = {
  open: boolean;
  handleClose: () => void;
};
const StyledModal = ({
  open,
  handleClose,
  children,
}: PropsWithChildren<Props>) => {
  const { breakpoints } = useTheme();
  if (!children) return null;
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
          onClick: handleClose,
          timeout: 500,
        },
      }}
    >
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Box
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
          {children}
        </Box>
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

export default StyledModal;
