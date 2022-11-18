import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {tutorialsApi} from '../features/tutorials/tutorialsApi';
import {setupListeners} from '@reduxjs/toolkit/query';
import tutorialsSlice from '../features/tutorials/tutorialsSlice'

export const store = configureStore({
  reducer: {
      [tutorialsApi.reducerPath]: tutorialsApi.reducer,
      tutorialsSlice: tutorialsSlice
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(tutorialsApi.middleware)
});

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
