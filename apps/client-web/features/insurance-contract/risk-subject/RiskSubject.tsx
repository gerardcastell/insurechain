import { Box, Button, Grid, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import { RiskSubject } from '../proposal-store';
import useProposalStore from '../proposal-store/useProposalStore';
import Presenter from './Presenter';

const RiskSubject = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RiskSubject>({ mode: 'onBlur' });

  const [riskSubject, setRiskSubject] = useProposalStore((state) => [
    state.riskSubject,
    state.setRiskSubject,
  ]);

  const isRiskSubjectDefined =
    riskSubject?.birthDate && riskSubject?.name && riskSubject?.documentNumber;

  const onSubmit = (data: RiskSubject) => {
    setRiskSubject(data);
  };

  return isRiskSubjectDefined ? (
    <Presenter data={riskSubject} />
  ) : (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="name"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'The name is required',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Full name"
                variant="outlined"
                fullWidth
                error={!!errors.name}
                helperText={errors.name ? 'This field is required' : null}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="documentNumber"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'The document number is required',
              },
              pattern: {
                value: /^[0-9]{8}[A-Z]{1}$/,
                message: 'The document number is invalid',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Document Number"
                variant="outlined"
                fullWidth
                placeholder="11111111H"
                error={!!errors.name}
                helperText={errors.name ? 'This field is required' : null}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="birthDate"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'The birthday is required',
              },
            }}
            render={({ field: { onChange, ...field } }) => (
              <DatePicker
                {...field}
                label="Birth Date"
                onChange={(e) => {
                  onChange(dayjs(e).toDate());
                }}
                sx={{ width: '100%' }}
                openTo="year"
                format="LL"
                views={['year', 'month', 'day']}
                maxDate={dayjs().subtract(18, 'year') as unknown as Date}
                minDate={dayjs().subtract(75, 'year') as unknown as Date}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            disabled={!isValid}
            sx={{ float: 'right' }}
            variant="contained"
            type="submit"
          >
            Quote
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RiskSubject;
