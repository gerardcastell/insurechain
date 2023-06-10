import React, { useEffect, useRef, useState } from 'react';
import { CoverageType } from '../proposal-store';
import { Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import Lottie from 'lottie-react';
import checkedAnimation from '../../../public/lottie/checked.json';
import { useQuery } from '@tanstack/react-query';
import { getSellPrice } from '@insurechain/web/backend/data-access';
import DismissAnimation from '../components/Dismiss';
const CoverageCard = ({
  title,
  description,
  monthlyPremium,
  selected,
}: CoverageType) => {
  const { palette, breakpoints } = useTheme();
  const animationRef = useRef<any>();
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
    }
  }, [firstLoad]);

  const { isLoading, data: ethPrice } = useQuery({
    queryKey: ['getCurrency'],
    queryFn: () => getSellPrice(),
    cacheTime: 1000 * 60,
  });

  const convertedPrice = monthlyPremium / ethPrice;

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
      <Grid container padding={3} position={'relative'}>
        <Grid item container xs={11}>
          <Grid item xs={8}>
            <Typography variant="body1">{title}</Typography>
          </Grid>
          <Grid display="flex" justifyContent="flex-end" item xs={4}>
            {isLoading ? (
              <Typography variant="body1" color="yellowgreen">
                Converting to ETH...
              </Typography>
            ) : (
              <Box textAlign="right">
                <Typography
                  variant="body1"
                  fontWeight={400}
                  fontStyle="oblique"
                >
                  {convertedPrice.toPrecision(6)} ETH
                </Typography>
                <Typography
                  variant="body2"
                  color={grey[500]}
                  fontStyle="oblique"
                >
                  {monthlyPremium.toFixed(2)}€
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
        <Grid item xs={11} paddingTop={2}>
          <Typography color={grey[600]} variant="body2">
            {description}
          </Typography>
        </Grid>
        <Box
          className="onHoverBox"
          sx={{
            zIndex: 2,
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
            whiteSpace="nowrap"
          >
            Click to {selected ? 'remove' : 'add'}
          </Typography>
        </Box>
        {selected && (
          <Box
            className="addedBox"
            sx={{
              zIndex: 1,
              position: 'absolute',
              height: '100%',
              top: 0,
              right: 0,
              backgroundColor: green[400],
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
              Added
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
          }}
        >
          {selected && (
            <Lottie
              // onConfigReady={() => setAnimationLoaded(true)}
              style={{ height: '120px', width: '120px' }}
              animationData={checkedAnimation}
              lottieRef={animationRef}
              autoPlay={true}
              loop={false}
            />
          )}
          {!selected && !firstLoad && <DismissAnimation />}
        </Box>
      </Grid>
    </Paper>
  );
};

export default CoverageCard;
