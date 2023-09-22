import React from 'react';
import { StyledLink } from '..';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type Props = {
  text: string;
  link: string;
};
export const BackLink = ({ text, link }: Props) => {
  return (
    <StyledLink textTransform={'capitalize'} color={'primary'} href={link}>
      <Stack direction={'row'} spacing={1}>
        <ArrowBackIcon fontSize="small" />
        <Typography variant="body2">{text}</Typography>
      </Stack>
    </StyledLink>
  );
};
