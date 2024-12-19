import { configureStore } from '@reduxjs/toolkit';
import { protoReducer } from './proto';
import { layersReducer } from './layers';

export const store = configureStore({
  // TODO: remove protoReducer later
  reducer: { proto: protoReducer, layers: layersReducer },

  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
