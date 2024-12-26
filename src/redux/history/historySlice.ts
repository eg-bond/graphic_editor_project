import { LayerHistoryActions } from '@/types/historyTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LayerT } from '../layers/layersSlice';

export type HistoryT = {
  id: number;
  type: LayerHistoryActions;
  layersList: Array<LayerT>;
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
    addNewHistoryItem: (
      state,
      action: PayloadAction<{
        type: LayerHistoryActions;
        layersList: Array<LayerT>;
      }>
    ) => {
      const newItem: HistoryT = {
        id: state.historyIdCount,
        type: action.payload.type,
        layersList: action.payload.layersList,
      };
      state.historyIdCount++;

      // if active item is not last - all items after active should be removed
      if (state.activeItemIndex !== state.items.length - 1) {
        state.items = state.items.slice(0, state.activeItemIndex + 1);
      }
      state.items.push(newItem);
      state.activeItemIndex = state.items.length - 1;
    },
  },
});
