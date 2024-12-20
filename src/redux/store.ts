import { configureStore } from '@reduxjs/toolkit';
import { protoReducer } from './proto';
import { layersReducer } from './layers';
import { historyReducer } from './history';

export const store = configureStore({
  // TODO: remove protoReducer later
  reducer: {
    proto: protoReducer,
    layers: layersReducer,
    history: historyReducer,
  },

  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
