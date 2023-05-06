import * as React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { signIn } from 'next-auth/react';

export function ErrorPage() {
  const router = useRouter();

  return (
    <Modal
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2" id="modal-modal-title">
          Error Message:
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {router.query.error}
        </Typography>
        <Box
          sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}
          component="div"
        >
          <Button variant="outlined" onClick={() => router.push('/')}>
            Visit home
          </Button>
          <Button variant="contained" onClick={() => signIn()}>
            Go back to login
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ErrorPage;

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  py: 3,
  px: 4,
};
