import { VersionDto } from '@insurechain/web/backend/data-access';
import { Box, Button, useTheme } from '@mui/material';
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';

type Props = {
  versions: VersionDto[];
  onSelectVersion: (version: VersionDto) => void;
  onResetData(): void;
};

const Selector = ({ versions, onSelectVersion, onResetData }: Props) => {
  const { palette } = useTheme();
  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: palette.secondary.main }}>
            <TableRow>
              <TableCell sx={{ color: '#fff' }}>Version</TableCell>
              <TableCell sx={{ color: '#fff' }} align="right">
                Release Date
              </TableCell>
              <TableCell sx={{ color: '#fff' }} align="right">
                Fuel Type
              </TableCell>
              <TableCell sx={{ color: '#fff' }} align="right">
                Doors
              </TableCell>
              <TableCell sx={{ color: '#fff' }} align="right">
                Power
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {versions.map((car) => (
              <TableRow
                onClick={() => onSelectVersion(car)}
                key={car.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  ':hover': {
                    backgroundColor: palette.secondary.light,
                    cursor: 'pointer',
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {car.maker} {car.model} {car.version}
                </TableCell>
                <TableCell align="right">
                  {dayjs(car.releaseDate).year()}
                </TableCell>
                <TableCell align="right">{car.fuelType}</TableCell>
                <TableCell align="right">{car.numberDoors}</TableCell>
                <TableCell align="right">{car.power}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box marginY={2} sx={{ float: 'right' }}>
        <Button variant="outlined" onClick={onResetData}>
          Reset data
        </Button>
      </Box>
    </Box>
  );
};

export default Selector;
