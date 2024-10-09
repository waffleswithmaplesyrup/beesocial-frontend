import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import counterReducer from './slices/counterSlice'
import { eventsApi } from './APIs/eventsApi.ts'
import darkThemeReducer from './slices/darkThemeSlice'
import { pokemonApi } from './APIs/pokemonApi'
import { authApi } from "./APIs/authApi.ts";
import { userApi } from "./APIs/userApi.ts";
import { contentApi } from './APIs/contentApi.ts'
import { imageApi } from './APIs/imageApi.ts'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    // Add the generated reducer as a specific top-level slice
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [contentApi.reducerPath]: contentApi.reducer,
    [imageApi.reducerPath]: imageApi.reducer,

    darkTheme: darkThemeReducer,
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        pokemonApi.middleware,
        eventsApi.middleware,
        authApi.middleware,
        userApi.middleware,
        contentApi.middleware,
        imageApi.middleware,
        ),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)