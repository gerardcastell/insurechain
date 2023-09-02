import NextLink from 'next/link';
import { PropsWithChildren } from 'react';
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';

//Idea from https://gist.github.com/kachar/028b6994eb6b160e2475c1bb03e33e6a?permalink_comment_id=4411235#gistcomment-4411235

const Link = ({ children, ...props }: PropsWithChildren<MuiLinkProps>) => {
  return (
    <MuiLink component={NextLink} {...props}>
      {children}
    </MuiLink>
  );
};

export default Link;
