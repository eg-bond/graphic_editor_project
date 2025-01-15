import { HistoryItemKinds } from '@/types/historyTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { swapArrayElements } from '@/utils/swapArrayElements.ts';
import { addNewHistoryItemToLS } from '@/utils/addNewHistoryItemToLS';
import { ProjectData } from '@/types/localStorageTypes';
import { addNewHistoryItemToState } from './helpers';

export interface LayerT {
  id: number;
  name: string;
  opacity: number;
  visible: boolean;
  canvasData: string;
}

export type HistoryItemT = {
  id: number;
  kind: HistoryItemKinds;
  layersList: Array<LayerT>;
  activeLayerIndex: number;
};

export interface HistorySliceStateT {
  projectId: string | null;
  maxHistoryLength: number;
  // ProjectData
  items: Array<HistoryItemT>;
  historyIdCount: number;
  activeItemIndex: number;
  layerIdCount: number;
}

const HISTORY_MAX_LENGTH = 20;
const NEW_LAYER_NAME = 'Cлой ';

const initialState: HistorySliceStateT = {
  projectId: null,
  items: [],
  historyIdCount: 0,
  activeItemIndex: 0,
  maxHistoryLength: HISTORY_MAX_LENGTH,
  layerIdCount: 0,
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setProjectData: (state, action: PayloadAction<{
      id: string; data?: ProjectData;
    }>) => {
      state.projectId = action.payload.id;
      if (action.payload.data) {
        state.items = action.payload.data.items;
        state.historyIdCount = action.payload.data.historyIdCount;
        state.activeItemIndex = action.payload.data.activeItemIndex;
        state.layerIdCount = +action.payload.data.layerIdCount || 0;
      } else {
        state.items = [];
        state.historyIdCount = 0;
        state.activeItemIndex = -1;
        state.layerIdCount = 0;
      }
    },
    activateHistoryItem: (state, action: PayloadAction<{
      index: number;
    }>) => {
      state.activeItemIndex = action.payload.index;
    },
    setStateFromHistory: (state, action: PayloadAction<{
      layersList: Array<LayerT>;
    }>) => {
      state.items[state.activeItemIndex].layersList = action.payload.layersList;
    },
    addLayer: (state) => {
      state.layerIdCount++;
      const newLayer: LayerT = {
        id: state.layerIdCount,
        name: NEW_LAYER_NAME + String(state.layerIdCount),
        opacity: 100,
        visible: true,
        canvasData: '',
      };

      const layers = [...(state.items[state.activeItemIndex]?.layersList ?? [])];
      layers.push(newLayer);

      addNewHistoryItemToState(state, {
        kind: HistoryItemKinds.Add,
        layersList: layers,
        activeLayerIndex: layers.length,
      });
      addNewHistoryItemToLS(state);
    },
    removeLayer: (state, action: PayloadAction<{
      index: number;
    }>) => {
      const activeElement = state.items[state.activeItemIndex];
      const layers = [...(activeElement?.layersList ?? [])];

      layers.splice(action.payload.index, 1);

      addNewHistoryItemToState(state, {
        kind: HistoryItemKinds.Remove,
        layersList: layers,
        activeLayerIndex: activeElement?.activeLayerIndex ?? -1,
      });
      addNewHistoryItemToLS(state);
    },
    activateLayer: (state, action: PayloadAction<{
      index: number;
    }>) => {
      state.items[state.activeItemIndex].activeLayerIndex = action.payload.index;
    },
    changeOpacity: (state, action: PayloadAction<{
      activeLayerIndex: number; opacity: number;
    }>) => {
      const activeElement = state.items[state.activeItemIndex];
      const layers = [...(activeElement?.layersList ?? [])];

      const index = action.payload.activeLayerIndex;

      layers[index] = { ...layers[index], opacity: action.payload.opacity };

      addNewHistoryItemToState(state, {
        kind: HistoryItemKinds.Opacity,
        layersList: layers,
        activeLayerIndex: activeElement?.activeLayerIndex ?? -1,
      });
      addNewHistoryItemToLS(state);
    },
    changeLayerVisibility: (state, action: PayloadAction<{
      index: number;
    }>) => {
      const activeElement = state.items[state.activeItemIndex];
      const layers = [...(activeElement?.layersList ?? [])];

      const index = action.payload.index;

      layers[index] = { ...layers[index], visible: !layers[index].visible };

      addNewHistoryItemToState(state, {
        kind: HistoryItemKinds.Visibility,
        layersList: layers,
        activeLayerIndex: activeElement?.activeLayerIndex ?? -1,
      });
      addNewHistoryItemToLS(state);
    },
    changeLayerName: (state, action: PayloadAction<{
      index: number; name: string;
    }>) => {
      const i = action.payload.index;
      const activeElement = state.items[state.activeItemIndex];
      const layers = [...(activeElement?.layersList ?? [])];
      layers[i] = { ...layers[i], name: action.payload.name };

      addNewHistoryItemToState(state, {
        kind: HistoryItemKinds.Rename,
        layersList: layers,
        activeLayerIndex: activeElement?.activeLayerIndex ?? -1,
      });
      addNewHistoryItemToLS(state);
    },
    moveLayerUp: (state, action: PayloadAction<{
      index: number;
    }>) => {
      const { index } = action.payload;

      if (index <= 0) {
        return;
      }

      const activeElement = { ...state.items[state.activeItemIndex] };
      activeElement.layersList = [...activeElement.layersList];
      if (activeElement.activeLayerIndex === index) {
        activeElement.activeLayerIndex = index - 1;
      }
      swapArrayElements(activeElement.layersList, index, index - 1);

      addNewHistoryItemToState(state, {
        kind: HistoryItemKinds.Order,
        layersList: activeElement.layersList,
        activeLayerIndex: activeElement?.activeLayerIndex ?? -1,
      });
      addNewHistoryItemToLS(state);
    },
    moveLayerDown: (state, action: PayloadAction<{
      index: number;
    }>) => {
      const { index } = action.payload;

      if (index >= state.items[state.activeItemIndex].layersList.length - 1) {
        return;
      }

      const activeElement = { ...state.items[state.activeItemIndex] };
      activeElement.layersList = [...activeElement.layersList];
      if (activeElement.activeLayerIndex === index) {
        activeElement.activeLayerIndex = index + 1;
      }
      swapArrayElements(activeElement.layersList, index, index + 1);

      addNewHistoryItemToState(state, {
        kind: HistoryItemKinds.Order,
        layersList: activeElement.layersList,
        activeLayerIndex: activeElement?.activeLayerIndex ?? -1,
      });
      addNewHistoryItemToLS(state);
    },
    addDrawing: (state, action: PayloadAction<{
      canvasData: string;
    }>) => {
      const activeElement = state.items[state.activeItemIndex];
      const layers = [...(activeElement?.layersList ?? [])];

      const index = activeElement?.activeLayerIndex;

      layers[index] = { ...layers[index], canvasData: action.payload.canvasData };

      addNewHistoryItemToState(state, {
        kind: HistoryItemKinds.Brush,
        layersList: layers,
        activeLayerIndex: index ?? -1,
      });
      addNewHistoryItemToLS(state);
    },
  },
});
