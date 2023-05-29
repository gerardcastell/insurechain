import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#243763',
    },
    secondary: {
      main: '#539165',
    },
    error: {
      main: red.A400,
    },
  },
});
export default theme;
