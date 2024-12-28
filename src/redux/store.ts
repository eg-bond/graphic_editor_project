import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { layersReducer } from './layers';
import { historyReducer } from './history';

export const store = configureStore({
  reducer: {
    layers: layersReducer,
    history: historyReducer,
  },

  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
