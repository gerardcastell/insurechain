import { useForm, Controller } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material';
import { FuelType, ParkingType } from '@prisma/client';
import {
  getMakers,
  getVersions,
  GetVersionsPayload,
  MakerDto,
  VersionDto,
} from '@insurechain/web/backend/data-access';
import { debounce } from '@mui/material/utils';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const KMS_RANGE: readonly number[] = [
  5000, 10000, 15000, 20000, 30000, 40000, 50000, 60000,
];

const PARKING_TYPE: Record<ParkingType, string> = {
  [ParkingType.garage]: 'Individual garage',
  [ParkingType.street]: 'Street',
  [ParkingType.collective_car_park]: 'Unguarded collective garage',
  [ParkingType.collective_car_park_surveillance]: 'Guarded Collective garage',
};

type FormRiskObjectInputs = {
  maker: string;
  model: string;
  version: string;
  doorsNumber: number;
  fuelType: FuelType;
  power: number;
  purchaseDate: Date;
  plate: string;
  kmsYear: number;
  parking: string;
  // releaseDate: Date;
  // retailPrice: number;
};
export type FormRiskObjectOutput = {
  riskObject: FormRiskObjectInputs;
  versions: VersionDto[];
};

type Props = {
  onSubmit: (data: FormRiskObjectOutput) => void;
};

const FormRiskObject = ({ onSubmit }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormRiskObjectInputs>({ mode: 'onBlur' });

  const convertCapitalCase = (str: string) =>
    str?.charAt(0)?.toUpperCase() + str?.slice(1);
  const [makerList, setMakerList] = useState<MakerDto[]>([]);
  const [modelList, setModelList] = useState<string[]>([]);
  const [versionList, setVersionList] = useState<VersionDto[]>([]);
  const [fuelTypeList, numberDoorsList, powerList] = versionList
    .reduce(
      (acc, curr) => {
        acc[0] = [...acc[0], curr.fuelType];
        acc[1] = [...acc[1], curr.numberDoors];
        acc[2] = [...acc[2], +curr.power];
        return acc;
      },
      [[], [], []]
    )
    .map((list) => (list?.length ? [...new Set(list)] : []));
  const searchMakers = async (event) => {
    if (!event.target.value || event.target.value?.length < 1) {
      setMakerList([]);
    } else {
      const makers = await getMakers(event.target.value);
      setMakerList(makers);
    }
  };

  useEffect(() => {
    async function searchVersions(payload: GetVersionsPayload) {
      const versions =
        payload.maker && payload.model ? await getVersions(payload) : [];
      setVersionList(versions);
    }
    const subscription = watch(
      ({ maker, model, doorsNumber, power, fuelType }) => {
        if (model) {
          const payload: GetVersionsPayload = {
            maker: maker,
            model,
            fuelType: fuelType || null,
            power: power || null,
            numberDoors: doorsNumber || null,
          };
          searchVersions(payload);
        }
      }
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  const onChangeMakerInput = debounce(searchMakers, 1000);
  return (
    <Box
      sx={{ width: '100%' }}
      component="form"
      onSubmit={handleSubmit((riskObject) =>
        onSubmit({ riskObject, versions: versionList })
      )}
    >
      <Paper elevation={8}>
        <Grid container spacing={2} padding={2}>
          <Grid item xs={12} sm={12}>
            <Controller
              name="plate"
              control={control}
              defaultValue=""
              rules={{
                pattern: {
                  value: /^\d{4}[A-Za-z]{3}$/,
                  message: 'Invalid plate',
                },
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  inputProps={{ style: { textTransform: 'uppercase' } }}
                  error={!!errors.plate}
                  fullWidth
                  helperText={errors.plate?.message}
                  label="Plate"
                  placeholder="Ex. 1234BCD"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              control={control}
              defaultValue={undefined}
              name="maker"
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  freeSolo
                  onChange={(_, option: MakerDto) => {
                    onChange(option?.maker);

                    setModelList(option?.models || []);
                  }}
                  options={makerList}
                  // loading
                  placeholder="Write a maker to initiate search..."
                  loadingText="Searching makers..."
                  noOptionsText="No makers found"
                  clearOnBlur
                  filterOptions={(x) => x}
                  getOptionLabel={(option: MakerDto) =>
                    convertCapitalCase(option.maker)
                  }
                  onInputChange={onChangeMakerInput}
                  renderInput={(params) => (
                    <TextField {...params} label={'Maker'} variant="outlined" />
                  )}
                />
              )}
            />
          </Grid>
          {modelList.length > 0 && (
            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                defaultValue={undefined}
                name="model"
                render={({ field: { onChange, ...field } }) => (
                  <Autocomplete
                    {...field}
                    options={modelList}
                    // loading
                    onChange={(_, option: string) => {
                      onChange(option);
                    }}
                    placeholder="Type to search a model..."
                    loadingText="Searching models..."
                    noOptionsText="No models found"
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label={'Model'}
                        variant="outlined"
                      />
                    )}
                  />
                )}
              />
            </Grid>
          )}
          {versionList?.length > 0 && (
            <>
              {fuelTypeList?.length > 0}
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  defaultValue={undefined}
                  name="fuelType"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="fuelType">Fuel Type</InputLabel>
                      <Select label="Fuel Type" {...field} fullWidth>
                        {watch('fuelType') && (
                          <MenuItem value="">
                            <em>See all</em>
                          </MenuItem>
                        )}
                        {fuelTypeList.map((fuelType) => (
                          <MenuItem key={fuelType} value={fuelType}>
                            {convertCapitalCase(fuelType)}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name="power"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="power">Power</InputLabel>
                      <Select label="Power" {...field} fullWidth>
                        {watch('power') && (
                          <MenuItem value="">
                            <em>See all</em>
                          </MenuItem>
                        )}
                        {powerList
                          .sort((a, b) => (a < b ? -1 : 1))
                          .map((power) => (
                            <MenuItem key={power} value={power}>
                              {power}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name="doorsNumber"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="doorsNumber">Doors Number</InputLabel>
                      <Select label="Doors Number" {...field} fullWidth>
                        {numberDoorsList.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="kmsYear"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="kmsYear">Kms year</InputLabel>
                      <Select label="Kms year" {...field} fullWidth>
                        {KMS_RANGE.map((option, idx) => (
                          <MenuItem key={option} value={option}>
                            {idx === KMS_RANGE.length - 1
                              ? 'Until'
                              : 'More than'}{' '}
                            {option.toLocaleString()} km
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="parking"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="parking">Usual parking</InputLabel>
                      <Select label="Usual Parking" {...field} fullWidth>
                        {Object.keys(PARKING_TYPE).map((option, idx) => (
                          <MenuItem key={option} value={option}>
                            {PARKING_TYPE[option]}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="purchaseDate"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, ...field } }) => (
                    <DatePicker
                      {...field}
                      label="Purchase date"
                      onChange={(e) => {
                        console.log(dayjs(e).toDate());
                        onChange(dayjs(e).toDate());
                      }}
                      openTo="year"
                      format="LL"
                      views={['year', 'month', 'day']}
                      maxDate={dayjs().subtract(1, 'day') as unknown as Date}
                      minDate={dayjs().subtract(12, 'year') as unknown as Date}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  disabled={!isValid}
                  variant="contained"
                  type="submit"
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};

export default FormRiskObject;
