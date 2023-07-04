import NextLink from 'next/link';
import { PropsWithChildren } from 'react';
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';

const Link = ({ children }: PropsWithChildren<MuiLinkProps>) => {
  return <MuiLink component={NextLink}>{children}</MuiLink>;
};

export default Link;
