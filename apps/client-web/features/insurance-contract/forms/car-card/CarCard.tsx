import { VersionDto } from '@insurechain/web/backend/data-access';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BoltIcon from '@mui/icons-material/Bolt';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStationOutlined';
import dayjs from 'dayjs';
import SensorDoorOutlinedIcon from '@mui/icons-material/SensorDoorOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined';
import { FuelType } from '@prisma/client';
import PresenterCard from '../../components/Card';
type ElementProps = {
  title: string;
  content: string | number;
  icon: React.ReactNode;
};
const Element = ({ title, content, icon }: ElementProps) => {
  return (
    <Box component="div" display={'flex'}>
      <Box component={'div'} marginRight={1}>
        {icon}
      </Box>
      <Box component="div">
        <Typography variant="caption" fontStyle={'italic'}>
          {title}
        </Typography>
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
  return (
    <PresenterCard title="Car Information" icon={DirectionsCarIcon}>
      <Grid container display="flex" maxWidth={'sm'} spacing={1}>
        <Grid item xs={12} sm={3}>
          <Element
            title="Maker & Model"
            content={`${data.maker} ${data.model}`}
            icon={<DirectionsCarOutlinedIcon fontSize="inherit" />}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Element
            title="Version"
            content={data.version}
            icon={<SellOutlinedIcon fontSize="inherit" />}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Element
            title="Release Date"
            content={dayjs(data.releaseDate).format('LL')}
            icon={<CalendarMonthOutlinedIcon fontSize="inherit" />}
          />
        </Grid>
        <Grid item xs={3}>
          <Element
            title="Power"
            content={`${data.power} ${
              data.fuelType === FuelType.electric ? 'kW' : 'HP'
            }`}
            icon={<BoltIcon fontSize="inherit" />}
          />
        </Grid>
        <Grid item xs={5}>
          <Element
            title="Fuel Type"
            content={data.fuelType}
            icon={<LocalGasStationIcon fontSize="inherit" />}
          />
        </Grid>

        <Grid item xs={4}>
          <Element
            title="Doors"
            content={data.numberDoors}
            icon={<SensorDoorOutlinedIcon fontSize="inherit" />}
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
    </PresenterCard>
  );
};

export default CarCard;
