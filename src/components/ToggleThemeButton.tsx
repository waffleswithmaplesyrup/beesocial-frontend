import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store";
import { Button, Typography } from "@mui/material";
import { toggleTheme } from "../redux/slices/darkThemeSlice";

function ToggleThemeButton() {

  const isDarkMode = useSelector((state: RootState) => state.darkTheme.isDarkMode);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Button
      variant='contained'
      onClick={() => dispatch(toggleTheme())}
    >
      {
        isDarkMode ?
        <Typography>Toggle Light Mode</Typography>
        :
        <Typography>Toggle Dark Mode</Typography>
      }
      
    </Button>
  )
}

export default ToggleThemeButton
