import Container from '@mui/material/Container';
import React, { PropsWithChildren } from 'react';
import { BackLink } from './BackLink';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type Props = {
  backLink?: {
    text: string;
    link: string;
  };
  title?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};
export const PageLayout = ({
  children,
  backLink,
  maxWidth = 'md',
  title,
}: PropsWithChildren<Props>) => {
  return (
    <Container maxWidth={maxWidth} sx={{ my: 4 }}>
      {backLink && (
        <Box mb={2}>
          <BackLink text={backLink.text} link={backLink.link} />
        </Box>
      )}
      {title && (
        <Box mb={2}>
          <Typography variant="h4" component="h1" gutterBottom>
            {title}
          </Typography>
        </Box>
      )}
      {children}
    </Container>
  );
};
