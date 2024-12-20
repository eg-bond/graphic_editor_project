import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type HistoryT = {
  id: number;
  name: string;
  type: string;
  active: boolean;
};

const initialState: Array<HistoryT> = [
  { id: 0, name: 'Действие 1', type: 'pen', active: false },
  { id: 1, name: 'Действие 2', type: 'circle', active: false },
  { id: 2, name: 'Действие 3', type: 'brush', active: false },
];

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    activateHistoryItem: (state, action: PayloadAction<number>) => {
      const prevActiveItemId = state.findIndex(item => item.active === true);
      const newActiveItemId = state.findIndex(
        item => item.id === action.payload
      );

      if (prevActiveItemId === newActiveItemId) return;

      if (prevActiveItemId === -1) {
        state[newActiveItemId].active = true;
        return;
      }
      state[prevActiveItemId].active = false;
      state[newActiveItemId].active = true;
    },
  },
});
