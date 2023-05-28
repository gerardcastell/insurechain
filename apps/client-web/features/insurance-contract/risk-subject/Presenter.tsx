import { Grid } from '@mui/material';
import React from 'react';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import dayjs from 'dayjs';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import { RiskSubject } from '../proposal-store';
import PresenterElement from '../components/PresenterElement';

type Props = {
  data: RiskSubject;
};

const Presenter = ({ data }: Props) => {
  return (
    <Grid container display="flex" maxWidth={'sm'} spacing={1}>
      <Grid item xs={12} sm={4}>
        <PresenterElement
          title="Full name"
          content={`${data.name}`}
          icon={<DirectionsCarOutlinedIcon fontSize="inherit" />}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <PresenterElement
          title="Version"
          content={data.documentNumber}
          icon={<SellOutlinedIcon fontSize="inherit" />}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <PresenterElement
          title="Birth date"
          content={dayjs(data.birdDate).format('LL')}
          icon={<CalendarMonthOutlinedIcon fontSize="inherit" />}
        />
      </Grid>
    </Grid>
  );
};

export default Presenter;
