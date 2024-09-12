import { Container, CssBaseline, ThemeProvider } from "@mui/material"
import { darkTheme, lightTheme } from "../theme"
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface CustomThemeProviderProps {
  children: JSX.Element
}

function CustomThemeProvider({ children }: CustomThemeProviderProps) {

  // import initial state stored
  const isDarkMode = useSelector((state: RootState) => state.darkTheme.isDarkMode);

  return (
    <ThemeProvider
      theme={isDarkMode ? darkTheme : lightTheme}
    >
      <CssBaseline />
      <Container
        component='div'
        sx={{
          width: '100%',
          height: '100vh',
        }}
      >
        {children}
      </Container>
    </ThemeProvider>
  )
}

export default CustomThemeProvider
