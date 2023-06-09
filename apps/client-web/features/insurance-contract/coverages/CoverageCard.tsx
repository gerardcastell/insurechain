import React, { useEffect, useRef, useState } from 'react';
import { CoverageType } from '../proposal-store';
import { Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import Lottie, { useLottie } from 'lottie-react';
import checkedAnimation from '../../../public/lottie/checked.json';
const CoverageCard = ({
  title,
  description,
  premium,
  selected,
}: CoverageType) => {
  const { palette, breakpoints } = useTheme();
  const animationRef = useRef<any>();
  const [animationLoaded, setAnimationLoaded] = useState(true);

  // const { View, playSegments } = useLottie(
  //   {
  //     animationData: checkedAnimation,
  //     loop: false,
  //     autoplay: false,
  //   },
  //   {
  //     height: 50,
  //   }
  // );
  // if (animationRef.current) {
  //   animationRef.current.playSegments([0, 49], true);
  // }

  // useEffect(() => {
  //   console.log(selected);
  //   if (selected) {
  //     animationRef.current.playSegments([0, 49], true);
  //   }else{
  //     animationRef.current.
  //   }
  // }, [selected]);

  // useEffect(() => {
  //   if (selected) {
  //     playSegments([0, 49], true);
  //   }
  // }, [selected, playSegments]);

  return (
    <Paper
      elevation={1}
      sx={{
        maxWidth: breakpoints.values.md,
        overflow: 'hidden',
        ':hover': {
          cursor: 'pointer',
          '& .onHoverBox': {
            right: 0,
          },
        },
      }}
    >
      <Grid container padding={3} position={'relative'} overflow="hidden">
        <Grid item container xs={11}>
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
            {/* {View} */}

            {/* {selected && (
              <Lottie
                // onConfigReady={() => setAnimationLoaded(true)}
                animationData={checkedAnimation}
                lottieRef={animationRef}
                autoPlay={false}
                loop={false}
              />
            )} */}
          </Grid>
        </Grid>
        <Grid item xs={11} paddingTop={2}>
          <Typography color={selected ? grey[100] : grey[600]} variant="body2">
            {description}
          </Typography>
        </Grid>
        <Box
          className="onHoverBox"
          sx={{
            position: 'absolute',
            height: '100%',
            top: 0,
            right: '-100px',
            backgroundColor: selected ? palette.error.light : green[300],
            transitionProperty: 'right',
            transitionDuration: '0.2s',
            transitionTimingFunction: 'ease-in-out',
            padding: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '50px',
          }}
        >
          <Typography
            textAlign="center"
            sx={{ transform: 'rotate(90deg) ' }}
            variant="body2"
            color="white"
          >
            {selected ? 'Remove' : 'Add'}
          </Typography>
        </Box>
      </Grid>
    </Paper>
  );
};

export default CoverageCard;
