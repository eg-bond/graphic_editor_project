import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum LayerHistoryActions {
  Add = 'ADD_LAYER',
  Remove = 'REMOVE_LAYER',
  // Изменение прозрачности (0-100)
  Rename = 'RENAME_LAYER',
  // Изменение видимости (true/false)
  ChangeOpacity = 'CHANGE_OPACITY',
  // Изменение порядка слоев
  ChangeVisibilidy = 'CHANGE_VISIBILITY',
  ChangeOrder = 'CHANGE_ORDER',
}

export type HistoryT = {
  id: number;
  name: string;
  type: string;
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
        name: 'Новое действие',
        type: action.payload,
      };
      state.historyIdCount++;
      state.items.push(newAction);
      state.activeItemIndex = state.items.length - 1;
    },
  },
});
