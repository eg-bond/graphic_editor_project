import { configureStore } from '@reduxjs/toolkit';
import { protoReducer } from './proto';

export const store = configureStore({
  // TODO: remove protoReducer later
  reducer: { proto: protoReducer },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
