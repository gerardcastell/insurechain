import { useForm, Controller } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { FuelType } from '@prisma/client';
import {
  getMakers,
  MakerDto,
  VersionDto,
} from '@insurechain/web/backend/data-access';
import { debounce } from '@mui/material/utils';
import { useQuery } from '@tanstack/react-query';

interface IFormRiskObjectInputs {
  maker: string;
  model: string;
  version: string;
  doorsNumber: number;
  fuelType: FuelType;
  power: number;
  purchaseDate: Date;
  releaseDate: Date;
  plate: string;
  retailPrice: number;
  kmsYear: number;
  parking: string;
}

const FormRiskObject = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<IFormRiskObjectInputs>();

  const convertCapitalCase = (str: string) =>
    str?.charAt(0)?.toUpperCase() + str?.slice(1);
  const [makersList, setMakersList] = useState<MakerDto[]>([]);
  const [model, setModel] = useState();
  const [versionList, setVersionList] = useState<VersionDto[]>([]);

  const searchMakers = async (event) => {
    if (event.target.value?.length < 1) return;
    const makers = await getMakers(event.target.value);

    setMakersList(makers);
  };
  const onChangeMakerInput = debounce(searchMakers, 1000);
  const onSubmit = (data) => console.log(data);
  console.log(getValues('maker'));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="maker"
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={makersList}
                loading
                placeholder="Write a maker to initiate search..."
                loadingText="Searching makers..."
                getOptionLabel={(option) => convertCapitalCase(option.maker)}
                onInputChange={onChangeMakerInput}
                renderInput={(params) => (
                  <TextField {...params} label={'Maker'} variant="outlined" />
                )}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="model"
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={makersList}
                autoHighlight
                filterOptions={(options, state) => {
                  return options
                    .find((o) =>
                      o.maker
                        .toLowerCase()
                        .includes(state.inputValue.toLowerCase())
                    )
                    .models.filter((o) =>
                      o.toLowerCase().includes(state.inputValue.toLowerCase())
                    );
                }}
                getOptionLabel={(option) => convertCapitalCase(option.maker)}
                onInputChange={onChangeMakerInput}
                renderInput={(params) => (
                  <TextField {...params} label={'Model'} variant="outlined" />
                )}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="fuelType"
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel id="fuelType">Fuel Type</InputLabel>
                <Select label="Fuel Type" {...field} fullWidth>
                  {Object.keys(FuelType).map((f) => (
                    <MenuItem key={f} value={f}>
                      {convertCapitalCase(f)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="plate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={Boolean(errors.plate)}
                fullWidth
                helperText={errors.plate?.message}
                label="Plate"
                placeholder="Ex. 1234BCD"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit" fullWidth>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormRiskObject;
