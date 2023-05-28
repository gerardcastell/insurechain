import {
  Box,
  Divider,
  Grid,
  IconProps,
  Paper,
  Typography,
} from '@mui/material';
import React, { PropsWithChildren } from 'react';

type Props = {
  title: string;
  icon: (props: IconProps) => JSX.Element;
};

const Step = ({ children, title, icon: Icon }: PropsWithChildren<Props>) => {
  return (
    <Grid item width="100%">
      <Paper elevation={8} sx={{ padding: 2 }}>
        <Box>
          <Typography
            variant="subtitle1"
            color="primary"
            sx={{ textTransform: 'uppercase' }}
          >
            <Icon fontSize="medium" sx={{ marginBottom: 1, marginRight: 1 }} />
            {title}
          </Typography>
          <Divider sx={{ marginBottom: 1 }} />
        </Box>
        <Box>{children}</Box>
      </Paper>
    </Grid>
  );
};

export default Step;
