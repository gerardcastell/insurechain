import React from 'react';
import { CoverageType } from '../proposal-store';
import { Grid, Paper, Typography } from '@mui/material';
import { green, grey } from '@mui/material/colors';

const CoverageCard = ({
  title,
  description,
  premium,
  selected,
}: CoverageType) => {
  return (
    <Paper
      elevation={1}
      sx={{
        ':hover': { cursor: 'pointer' },
        backgroundColor: selected ? green[400] : 'transparent',
      }}
    >
      <Grid container sx={{ padding: 2 }}>
        <Grid item xs={8}>
          <Typography variant="body1" color={selected ? 'white' : 'inherit'}>
            {title}
          </Typography>
        </Grid>
        <Grid display="flex" justifyContent="flex-end" item xs={4}>
          <Typography
            color={selected ? 'white' : 'inherit'}
            variant="body1"
            fontWeight={400}
          >
            {premium}€
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography color={selected ? grey[100] : grey[600]} variant="body2">
            {description}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CoverageCard;
