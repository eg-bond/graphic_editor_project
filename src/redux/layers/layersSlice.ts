import { swapArrayElements } from '@/utils/swapArrayElements';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LayerT = {
  id: number;
  name: string;
  opacity: number;
  visible: boolean;
};

type LayersSliceStateT = {
  list: Array<LayerT>;
  layerIdCount: number;
  activeLayerIndex: number;
};

const NEW_LAYER_NAME = 'Cлой ';

const initialState: LayersSliceStateT = {
  list: [],
  layerIdCount: 0,
  activeLayerIndex: -1,
};

export const layersSlice = createSlice({
  name: 'layers',
  initialState,
  reducers: {
    setStateFromHistory: (
      state,
      action: PayloadAction<{ layersList: Array<LayerT> }>
    ) => {
      state.list = action.payload.layersList;
    },
    addLayer: state => {
      const newLayer: LayerT = {
        id: state.layerIdCount,
        name: NEW_LAYER_NAME + String(state.layerIdCount),
        opacity: 100,
        visible: true,
      };
      state.layerIdCount++;
      state.list.push(newLayer);
    },
    removeLayer: (state, action: PayloadAction<{ index: number }>) => {
      state.list.splice(action.payload.index, 1);
    },
    activateLayer: (state, action: PayloadAction<{ index: number }>) => {
      state.activeLayerIndex = action.payload.index;
    },
    changeOpacity: (
      state,
      action: PayloadAction<{ activeLayerIndex: number; opacity: number }>
    ) => {
      const index = action.payload.activeLayerIndex;
      state.list[index].opacity = action.payload.opacity;
    },
    changeLayerVisibility: (
      state,
      action: PayloadAction<{ index: number }>
    ) => {
      const { index } = action.payload;
      state.list[index].visible = !state.list[index].visible;
    },
    changeLayerName: (
      state,
      action: PayloadAction<{ index: number; name: string }>
    ) => {
      state.list[action.payload.index].name = action.payload.name;
    },
    moveLayerUp: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      if (index <= 0) return;
      if (state.activeLayerIndex === index) {
        state.activeLayerIndex = index - 1;
      }
      swapArrayElements(state.list, index, index - 1);
    },
    moveLayerDown: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      if (index >= state.list.length - 1) return;
      if (state.activeLayerIndex === index) {
        state.activeLayerIndex = index + 1;
      }
      swapArrayElements(state.list, index, index + 1);
    },
  },
});
