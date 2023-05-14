import { VersionDto } from '@insurechain/web/backend/data-access';
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCarOutlined';
import PolicyIcon from '@mui/icons-material/PolicyOutlined';
import BoltIcon from '@mui/icons-material/Bolt';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStationOutlined';
import dayjs from 'dayjs';
import SensorDoorOutlinedIcon from '@mui/icons-material/SensorDoorOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined';
type ElementProps = {
  title: string;
  content: string | number;
  renderIcon: () => JSX.Element;
};
const Element = ({ title, content, renderIcon }: ElementProps) => {
  return (
    <Box component="div">
      <Box component="div">
        {renderIcon()}
        <Typography marginLeft={1} variant="caption" fontStyle={'italic'}>
          {title}
        </Typography>
      </Box>
      <Box component="div">
        <Typography
          sx={{ fontWeight: 'regular', textTransform: 'capitalize' }}
          variant="body1"
        >
          {content}
        </Typography>
      </Box>
    </Box>
  );
};

type Props = {
  data: VersionDto;
  onReset: () => void;
};

const CarCard = ({ data, onReset }: Props) => {
  const { palette } = useTheme();
  return (
    <Paper elevation={8}>
      <Grid container display="flex" maxWidth={'sm'} spacing={1} margin={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" color="primary">
            Car Information
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Element
            title="Maker & Model"
            content={`${data.maker} ${data.model}`}
            renderIcon={() => <DirectionsCarIcon fontSize="inherit" />}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Element
            title="Version"
            content={data.version}
            renderIcon={() => <SellOutlinedIcon fontSize="inherit" />}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Element
            title="Release Date"
            content={dayjs(data.releaseDate).format('LL')}
            renderIcon={() => <CalendarMonthOutlinedIcon fontSize="inherit" />}
          />
        </Grid>
        <Grid item xs={4}>
          <Element
            title="Fuel Type"
            content={data.fuelType}
            renderIcon={() => <LocalGasStationIcon fontSize="inherit" />}
          />
        </Grid>
        <Grid item xs={4}>
          <Element
            title="Power"
            content={data.power}
            renderIcon={() => <BoltIcon fontSize="inherit" />}
          />
        </Grid>
        <Grid item xs={4}>
          <Element
            title="Doors"
            content={data.numberDoors}
            renderIcon={() => <SensorDoorOutlinedIcon fontSize="inherit" />}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            size="small"
            variant="text"
            sx={{ float: 'right' }}
            color="warning"
            onClick={onReset}
            startIcon={<RotateLeftOutlinedIcon />}
          >
            Change car
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CarCard;
