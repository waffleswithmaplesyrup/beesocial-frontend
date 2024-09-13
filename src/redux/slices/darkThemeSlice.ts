import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const COLOR_SCHEME = 'color-scheme';
const PREFERENCE = 'preference';

export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
  SYSTEM: 'system',
};

// Define a type for the slice state
interface DarkThemeState {
  isDarkMode: boolean,
  preference: string,
}

// Define the initial state using that type
const initialState: DarkThemeState = {
  isDarkMode: localStorage.getItem(COLOR_SCHEME) === THEMES.DARK,
  preference: localStorage.getItem(PREFERENCE) || THEMES.LIGHT,
}

const DarkThemeSlice = createSlice({
  name: 'darkTheme',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<{value: string, prefersDarkMode: boolean}>) => {
      state.preference = action.payload.value;
      localStorage.setItem(PREFERENCE, state.preference);

      switch (state.preference) {
        case THEMES.LIGHT:
          state.isDarkMode = false;
          localStorage.setItem(COLOR_SCHEME, THEMES.LIGHT)
          return;
        case THEMES.DARK:
          state.isDarkMode = true;
          localStorage.setItem(COLOR_SCHEME, THEMES.DARK)
          return;
        case THEMES.SYSTEM:
          if (action.payload.prefersDarkMode) {
            state.isDarkMode = true;
            localStorage.setItem(COLOR_SCHEME, THEMES.DARK)
          } else {
            state.isDarkMode = false;
            localStorage.setItem(COLOR_SCHEME, THEMES.LIGHT)
          }
          return;
      }
    },
  },
})

export const { changeTheme } = DarkThemeSlice.actions

export default DarkThemeSlice.reducer;