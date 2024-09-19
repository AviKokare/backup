import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './slices/counterslice';
import authslice from './slices/authslice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    auth: authslice
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
  }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch