import Container from '@mui/material/Container';
import React, { PropsWithChildren } from 'react';
import { BackLink } from './BackLink';

type Props = {
  backLink?: {
    text: string;
    link: string;
  };
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};
export const PageLayout = ({
  children,
  backLink,
  maxWidth = 'md',
}: PropsWithChildren<Props>) => {
  return (
    <Container maxWidth={maxWidth} sx={{ my: 4 }}>
      {backLink && <BackLink text={backLink.text} link={backLink.link} />}
      {children}
    </Container>
  );
};
