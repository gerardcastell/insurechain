import { useForm, Controller } from 'react-hook-form';
import Input from '@mui/material/Input';
import React from 'react';

const Form = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: '',
      select: {},
    },
  });
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => <Input {...field} />}
      />

      <input type="submit" />
    </form>
  );
};

export default Form;
