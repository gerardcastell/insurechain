import * as React from 'react';
import { useEffect, useState, PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
import { axios } from '@insurechain/web/backend/data-access';
import { Grow } from '@mui/material';
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

export default function BackendLauncherProvider({
  children,
}: PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['health'],
    queryFn: async () => await axios.get('health'),
    onError: (err: AxiosError) => err,
  });
  let modalTitle = 'Waiting for backend to launch up';
  if (isError) {
    modalTitle = 'Unexpected error has occurred';
  }

  useEffect(() => {
    setTimeout(() => {
      setOpen(data?.data?.status !== 'ok');
    }, 2000);
  }, [data]);

  return (
    <>
      {children}
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grow in={open} style={{ transformOrigin: '0 0 0' }}>
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="body1"
              component="h2"
              sx={{
                marginBottom: 3,
              }}
            >
              {modalTitle}
            </Typography>
            {isLoading && <LinearProgress />}
            {isError && (
              <Typography id="modal-modal-description" noWrap>
                {error.message}
              </Typography>
            )}
          </Box>
        </Grow>
      </Modal>
    </>
  );
}
