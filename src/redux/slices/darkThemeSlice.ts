import { createSlice } from '@reduxjs/toolkit'

const COLOR_SCHEME = 'color-scheme';

const THEMES = {
  DARK: 'dark',
  LIGHT: 'light'
};

// Define a type for the slice state
interface DarkThemeState {
  isDarkMode: boolean,
}

// Define the initial state using that type
const initialState: DarkThemeState = {
  isDarkMode: localStorage.getItem(COLOR_SCHEME) === THEMES.DARK,
}

const DarkThemeSlice = createSlice({
  name: 'darkTheme',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;

      if (state.isDarkMode) {
        localStorage.setItem(COLOR_SCHEME, THEMES.DARK)
      } else {
        localStorage.setItem(COLOR_SCHEME, THEMES.LIGHT)
      }
    },
  },
})

export const { toggleTheme } = DarkThemeSlice.actions

export default DarkThemeSlice.reducer;