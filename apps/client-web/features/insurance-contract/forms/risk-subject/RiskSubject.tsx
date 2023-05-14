import { Box, Grid, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import dayjs from 'dayjs';

interface RiskSubjectI {
  name: string;
  birthDate: Date;
  documentNumber: string;
}

const RiskSubject = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RiskSubjectI>();
  return (
    <Box component="div">
      <Controller
        name="name"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Full name"
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name ? 'This field is required' : null}
          />
        )}
      />
      <Controller
        name="documentNumber"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Document Number"
            variant="outlined"
            placeholder="11111111H"
            error={!!errors.name}
            helperText={errors.name ? 'This field is required' : null}
          />
        )}
      />

      <Controller
        name="birthDate"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, ...field } }) => (
          <DatePicker
            {...field}
            label="Birth Date"
            onChange={(e) => {
              onChange(dayjs(e).toDate());
            }}
            openTo="year"
            format="LL"
            views={['year', 'month', 'day']}
            maxDate={dayjs().subtract(18, 'year') as unknown as Date}
            minDate={dayjs().subtract(75, 'year') as unknown as Date}
          />
        )}
      />
    </Box>
  );
};

export default RiskSubject;
