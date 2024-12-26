import { LayerHistoryActions } from '@/types/historyTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type HistoryT = {
  id: number;
  type: LayerHistoryActions;
};

export type HistorySliceStateT = {
  items: Array<HistoryT>;
  historyIdCount: number;
  activeItemIndex: number;
  maxHistoryLength: number;
};

const initialState: HistorySliceStateT = {
  items: [],
  historyIdCount: 0,
  activeItemIndex: -1,
  maxHistoryLength: 50,
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    activateHistoryItem: (state, action: PayloadAction<number>) => {
      state.activeItemIndex = action.payload;
    },
    addNewHistoryItem: (state, action: PayloadAction<LayerHistoryActions>) => {
      const newAction: HistoryT = {
        id: state.historyIdCount,
        type: action.payload,
      };
      state.historyIdCount++;
      state.items.push(newAction);
      state.activeItemIndex = state.items.length - 1;
    },
  },
});
