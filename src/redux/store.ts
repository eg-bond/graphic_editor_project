import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { historyReducer } from './history';
import { toolsReducer } from './tools';

interface DevTools {
  __REDUX_DEVTOOLS_EXTENSION__: () => boolean;
}

export const store = configureStore({
  reducer: {
    history: historyReducer,
    tools: toolsReducer,
  },

  devTools: (window as never as DevTools).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as never as DevTools).__REDUX_DEVTOOLS_EXTENSION__(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
