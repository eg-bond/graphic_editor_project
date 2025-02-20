import { HistoryItemKinds } from '@/types/historyTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProjectData } from '@/types/localStorageTypes';
import { addNewHistoryItemToState } from './helpers';
import {
  EMPTY_CANVAS_DATA,
  FIRST_HISTORY_ITEM,
  NEW_LAYER_NAME,
} from '@/utils/constants';

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
  width: number;
  height: number;
};

export interface HistorySliceStateT {
  projectDataId: string | null;
  maxHistoryLength: number;
  items: Array<HistoryItemT>;
  historyIdCount: number;
  activeItemIndex: number;
  layerIdCount: number;
}

const HISTORY_MAX_LENGTH = 10;

const initialState: HistorySliceStateT = {
  projectDataId: null,
  items: [{ ...FIRST_HISTORY_ITEM }],
  historyIdCount: 1,
  activeItemIndex: 0,
  layerIdCount: 0,
  maxHistoryLength: HISTORY_MAX_LENGTH,
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setProjectData: (state, action: PayloadAction<{
      id: string; data?: ProjectData;
    }>) => {
      state.projectDataId = action.payload.id;
      state.activeItemIndex = initialState.activeItemIndex;
      if (action.payload.data) {
        state.items = [{
          ...action.payload.data.historyItem,
          kind: HistoryItemKinds.OpenProject,
        }];
        state.historyIdCount = action.payload.data.historyIdCount;
        state.layerIdCount = +action.payload.data.layerIdCount || 0;
      } else {
        state.items = initialState.items;
        state.historyIdCount = initialState.historyIdCount;
        state.layerIdCount = initialState.layerIdCount;
      }
    },
    activateHistoryItem: (state, action: PayloadAction<{
      index: number;
    }>) => {
      state.activeItemIndex = action.payload.index;
    },
    setStateFromHistory: (state, action: PayloadAction<{
      layersList: LayerT[];
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
        canvasData: EMPTY_CANVAS_DATA,
      };

      const layers = [...state.items[state.activeItemIndex].layersList];
      layers.unshift(newLayer);

      addNewHistoryItemToState(state, {
        kind: HistoryItemKinds.Add,
        layersList: layers,
        activeLayerIndex: 0,
        width: state.items[state.activeItemIndex].width,
        height: state.items[state.activeItemIndex].height,
      });
    },
    removeLayer: (state, action: PayloadAction<{
      index: number;
    }>) => {
      const activeElement = state.items[state.activeItemIndex];
      const layers = [...activeElement.layersList];

      if (layers.length === 1) {
        return;
      }

      layers.splice(action.payload.index, 1);

      if (activeElement.activeLayerIndex !== 0) {
        activeElement.activeLayerIndex--;
      }

      addNewHistoryItemToState(state, {
        kind: HistoryItemKinds.Remove,
        layersList: layers,
        activeLayerIndex: activeElement.activeLayerIndex,
        width: activeElement.width,
        height: activeElement.height,
      });
    },

    activateLayer: (state, action: PayloadAction<{
      index: number;
    }>) => {
      state.items[state.activeItemIndex].activeLayerIndex = action.payload.index;
    },

    changeOpacity: (state, action: PayloadAction<{
      opacity: number;
    }>) => {
      const activeElement = state.items[state.activeItemIndex];
      const layers = [...activeElement.layersList];
      const index = activeElement.activeLayerIndex;
      layers[index] = { ...layers[index], opacity: action.payload.opacity };

      addNewHistoryItemToState(state, {
        kind: HistoryItemKinds.Opacity,
        layersList: layers,
        activeLayerIndex: activeElement.activeLayerIndex,
        width: activeElement.width,
        height: activeElement.height,
      });
    },

    changeLayerVisibility: (state, action: PayloadAction<{
      index?: number;
    }>) => {
      const activeElement = state.items[state.activeItemIndex];
      const layers = [...activeElement.layersList];
      let index;

      if (action.payload.index === undefined) {
        index = activeElement.activeLayerIndex;
      } else {
        index = action.payload.index;
      }

      layers[index] = { ...layers[index], visible: !layers[index].visible };

      addNewHistoryItemToState(state, {
        kind: HistoryItemKinds.Visibility,
        layersList: layers,
        activeLayerIndex: activeElement.activeLayerIndex,
        width: activeElement.width,
        height: activeElement.height,
      });
    },

    changeLayerName: (state, action: PayloadAction<{
      index: number; name: string;
    }>) => {
      const activeElement = state.items[state.activeItemIndex];
      const layers = [...activeElement.layersList];
      const index = action.payload.index;
      layers[index] = { ...layers[index], name: action.payload.name };

      addNewHistoryItemToState(state, {
        kind: HistoryItemKinds.Rename,
        layersList: layers,
        activeLayerIndex: activeElement.activeLayerIndex,
        width: activeElement.width,
        height: activeElement.height,
      });
    },

    addDrawing: (state, action: PayloadAction<{
      canvasData: string; kind: HistoryItemKinds;
    }>) => {
      const activeElement = state.items[state.activeItemIndex];
      const layers = [...activeElement.layersList];
      const index = activeElement.activeLayerIndex;
      layers[index] = { ...layers[index], canvasData: action.payload.canvasData };

      addNewHistoryItemToState(state, {
        kind: action.payload.kind,
        layersList: layers,
        activeLayerIndex: index,
        width: activeElement.width,
        height: activeElement.height,
      });
    },

    moveLayer: (state, action: PayloadAction<{
      from: number; to: number;
    }>) => {
      const { from, to } = action.payload;

      if (from === to) return;

      const activeElement = state.items[state.activeItemIndex];
      const layers = [...activeElement.layersList];
      const movedLayer = layers.splice(from, 1)[0];
      layers.splice(to, 0, movedLayer);

      activeElement.activeLayerIndex = to;

      addNewHistoryItemToState(state, {
        kind: HistoryItemKinds.Order,
        layersList: layers,
        activeLayerIndex: activeElement.activeLayerIndex,
        width: activeElement.width,
        height: activeElement.height,
      });
    },

    layerUp: (state) => {
      if (state.items[state.activeItemIndex].activeLayerIndex > 0) {
        state.items[state.activeItemIndex].activeLayerIndex -= 1;
      }
    },

    layerDown: (state) => {
      const layersLength = state.items[state.activeItemIndex].layersList.length;
      if (state.items[state.activeItemIndex].activeLayerIndex < layersLength - 1) {
        state.items[state.activeItemIndex].activeLayerIndex += 1;
      }
    },

    resizeCanvas: (state, action: PayloadAction<{
      width: number; height: number; updatedLayers: LayerT[];
    }>) => {
      const { width, height } = action.payload;
      const activeItem = state.items[state.activeItemIndex];

      addNewHistoryItemToState(state, {
        kind: HistoryItemKinds.ResizeCanvas,
        layersList: action.payload.updatedLayers,
        activeLayerIndex: activeItem.activeLayerIndex,
        width,
        height,
      });
    },

  },
});
