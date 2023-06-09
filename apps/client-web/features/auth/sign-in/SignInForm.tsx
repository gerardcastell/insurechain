import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type FormValues = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'The email is required',
          },
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Entered value does not match email format',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            error={!!errors.email}
            helperText={errors?.email?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'The password is required',
          },
          minLength: {
            value: 5,
            message: 'The minimum length is 5',
          },
          maxLength: {
            value: 20,
            message: 'The maximum length is 20',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            error={!!errors.password}
            helperText={errors?.password?.message}
          />
        )}
      />
      <Button variant="contained" type="submit">
        Login
      </Button>
    </Stack>
  );
};

export default SignInForm;
