import { Box, Divider, IconProps, Typography } from '@mui/material';
import React, { PropsWithChildren } from 'react';

type Props = {
  title: string;
  icon: (props: IconProps) => JSX.Element;
};

const Card = ({ title, icon: Icon, children }: PropsWithChildren<Props>) => {
  return (
    <Box>
      <Box>
        <Typography variant="subtitle1" color="primary">
          <Icon fontSize="medium" sx={{ marginBottom: 1, marginRight: 1 }} />
          {title}
        </Typography>
        <Divider sx={{ marginBottom: 1 }} />
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};

export default Card;
