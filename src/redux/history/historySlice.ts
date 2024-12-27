import { LayerHistoryActions } from '@/types/historyTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LayerT } from '../layers/layersSlice';

export type HistoryItemT = {
  id: number;
  type: LayerHistoryActions;
  layersList: Array<LayerT>;
};

export type HistorySliceStateT = {
  items: Array<HistoryItemT>;
  historyIdCount: number;
  activeItemIndex: number;
  maxHistoryLength: number;
};

const HISTORY_MAX_LENGTH = 20;

const initialState: HistorySliceStateT = {
  items: [],
  historyIdCount: 0,
  activeItemIndex: -1,
  maxHistoryLength: HISTORY_MAX_LENGTH,
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    activateHistoryItem: (state, action: PayloadAction<{ index: number }>) => {
      state.activeItemIndex = action.payload.index;
    },
    addNewHistoryItem: (
      state,
      action: PayloadAction<{
        type: LayerHistoryActions;
        layersList: Array<LayerT>;
      }>
    ) => {
      // Manage history size
      if (state.items.length >= state.maxHistoryLength) {
        state.items.shift();
      }
      // Remove future history if we're not at the end
      if (state.activeItemIndex !== state.items.length - 1) {
        state.items = state.items.slice(0, state.activeItemIndex + 1);
      }
      // Add new history item
      const newItem: HistoryItemT = {
        id: state.historyIdCount,
        type: action.payload.type,
        layersList: action.payload.layersList,
      };
      state.historyIdCount++;
      state.items.push(newItem);
      state.activeItemIndex = state.items.length - 1;
    },
  },
});
