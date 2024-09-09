import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#FEFEFD',
      dark: '#424242'
    },
    secondary: {
      main: '#424242',
      dark: '#FEFEFD'
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;