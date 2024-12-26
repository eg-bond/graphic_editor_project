import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum LayerHistoryActions {
  Add,
  Remove,
  Rename,
  ChangeOpacity,
  ChangeVisibility,
  ChangeOrder,
}

export function getHistoryName(action: LayerHistoryActions): string {
  switch (action) {
    case LayerHistoryActions.Add:
      return 'Новый слой';
    case LayerHistoryActions.Remove:
      return 'Удаление слоя';
    case LayerHistoryActions.Rename:
      return 'Переименование слоя';
    case LayerHistoryActions.ChangeOpacity:
      return 'Непрозрачность слоя';
    case LayerHistoryActions.ChangeVisibility:
      return 'Видимость слоя';
    case LayerHistoryActions.ChangeOrder:
      return 'Порядок слоев';
    default:
      return '';
  }
}

export type HistoryT = {
  id: number;
  name: string;
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
        name: 'Новое действие',
        type: action.payload,
      };
      state.historyIdCount++;
      state.items.push(newAction);
      state.activeItemIndex = state.items.length - 1;
    },
  },
});
