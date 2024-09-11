import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// custom themes for this app

const commonTheme = createTheme({
  typography: {
    // fontSize: 24
    
  },
});

export const lightTheme = createTheme({
  ...commonTheme,
  palette: {
    mode: 'light',
    text: {
      primary: '#424242',
    },
    background: {
      default: '#FEFEFD',
    },
    primary: {
      main: '#424242',
    },
    secondary: {
      main: '#FFCC00',
      light: '#ffdd00',
      dark: '#e6b400',
    },
    error: {
      main: red.A400,
    },
  },
});

export const darkTheme = createTheme({
  ...commonTheme,
  palette: {
    mode: 'dark',
    text: {
      primary: '#FEFEFD',
    },
    background: {
      default: '#424242',
    },
    primary: {
      main: '#FEFEFD',
    },
    secondary: {
      main: '#FFCC00',
      light: '#ffdd00',
      dark: '#e6b400',
    },
    error: {
      main: red.A400,
    },
  },
});
