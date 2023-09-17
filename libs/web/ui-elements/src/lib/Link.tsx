import NextLink from 'next/link';
import { PropsWithChildren } from 'react';
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';

//Idea from https://gist.github.com/kachar/028b6994eb6b160e2475c1bb03e33e6a?permalink_comment_id=4411235#gistcomment-4411235

export const StyledLink = ({
  children,
  textTransform,
  ...props
}: PropsWithChildren<MuiLinkProps>) => {
  return (
    <MuiLink
      component={NextLink}
      sx={{
        textDecoration: 'none',
        textTransform: textTransform || 'uppercase',
        color: 'inherit',
        '&:hover': {
          textDecoration: 'none',
        },
      }}
      {...props}
    >
      {children}
    </MuiLink>
  );
};
