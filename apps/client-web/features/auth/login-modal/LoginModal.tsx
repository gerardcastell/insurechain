import Box from '@mui/material/Box';
import Modal, { ModalProps } from '@mui/material/Modal';
import React from 'react';
import Login from '../login/Login';
import { style } from './style';
import Slide from '@mui/material/Slide';

const LoginModal = (
  props: Omit<ModalProps, 'children'> & {
    handleClose: () => void;
  }
) => {
  return (
    <Modal
      {...props}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Slide direction="up" in={props.open} mountOnEnter unmountOnExit>
        <Box sx={style}>
          <Login handleClose={props.handleClose} />
        </Box>
      </Slide>
    </Modal>
  );
};

export default LoginModal;
