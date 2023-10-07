import { Paper, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'next/image';
import React, { PropsWithChildren } from 'react';

type Props = {
  title: string | React.ReactElement;
  description?: string | React.ReactElement;
  imgSrc?: string;
  imgAlt?: string;
  imgFirst?: boolean;
  width?: number;
  height?: number;
  altContent?: React.ReactElement;
};
const SIZE_PX = 300;

const Section = ({
  title,
  description,
  imgSrc,
  imgAlt,
  imgFirst = false,
  width = SIZE_PX,
  height = SIZE_PX,
  altContent,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <Box>
      <Typography variant="h4" color="white" mb={4} textAlign="center">
        {title}
      </Typography>
      <Stack
        order={imgFirst ? 'revert' : 'inherit'}
        direction={{
          xs: imgFirst ? 'column-reverse' : 'column',
          md: imgFirst ? 'row-reverse' : 'row',
        }}
        spacing={{ xs: 4, md: 10 }}
        alignItems={'center'}
      >
        {altContent ?? (
          <Paper
            elevation={6}
            sx={{
              borderRadius: 4,
              padding: 3,
              background: '#557c93',
            }}
          >
            {typeof description === 'string' ? (
              <Typography color={'white'}>{description}</Typography>
            ) : (
              description
            )}
          </Paper>
        )}
        {imgSrc && (
          <Image
            src={imgSrc}
            alt={imgAlt}
            width={width}
            height={height}
            style={{ borderRadius: 9 }}
          />
        )}
      </Stack>
      {children && <Box>{children}</Box>}
    </Box>
  );
};

export default Section;
