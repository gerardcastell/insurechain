import Box from '@mui/material/Box';
import Modal, { ModalProps } from '@mui/material/Modal';
import React from 'react';
import Login from '../login/Login';
import { style } from './style';

const LoginModal = (props: Omit<ModalProps, 'children'>) => {
  return (
    <Modal
      {...props}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={style}>
        <Login />
      </Box>
    </Modal>
  );
};

export default LoginModal;
