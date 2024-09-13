import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store";
import { FormControl, InputLabel, MenuItem, Select, useMediaQuery } from "@mui/material";
import { changeTheme, THEMES, } from "../redux/slices/darkThemeSlice";
import { useEffect } from "react";

function ToggleThemeButton() {

  const preference = useSelector((state: RootState) => state.darkTheme.preference);
  const dispatch = useDispatch<AppDispatch>();

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // toggle to dark mode or light mode automatically 
  // when user changes system preference on their device
  useEffect(() => {
    if (preference === THEMES.SYSTEM) {
      dispatch(changeTheme({ value: preference, prefersDarkMode: prefersDarkMode }))
    }
  }, [preference, dispatch, prefersDarkMode]);

  console.log(Object.keys(THEMES))
  return (
    <>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Theme</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={preference}
          label="Theme"
          onChange={(e) => dispatch(changeTheme({ value: e.target.value, prefersDarkMode: prefersDarkMode }))}
        >
          {
            Object.keys(THEMES).map(mode => <MenuItem key={mode} value={THEMES[mode]}>{THEMES[mode]}</MenuItem>)
          }
        </Select>
      </FormControl>

    </>
  )
}

export default ToggleThemeButton
