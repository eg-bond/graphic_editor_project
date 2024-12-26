import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LayerT = {
  id: number;
  name: string;
  opacity: number;
  visible: boolean;
};

type InitialStateT = {
  list: Array<LayerT>;
  layerIdCount: number;
  activeLayerIndex: number;
};

const initialState: InitialStateT = {
  list: [],
  layerIdCount: 0,
  activeLayerIndex: -1,
};

const NEW_LAYER_NAME = 'Cлой ';

export const layersSlice = createSlice({
  name: 'layers',
  initialState,
  reducers: {
    setCurrentHistoryState: (state, action: PayloadAction<Array<LayerT>>) => {
      state.list = action.payload;
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
    removeLayer: (state, action: PayloadAction<number>) => {
      state.list.splice(action.payload, 1);
    },
    activateLayer: (state, action: PayloadAction<number>) => {
      state.activeLayerIndex = action.payload;
    },
    changeOpacity: (
      state,
      action: PayloadAction<{ activeLayerIndex: number; opacity: number }>
    ) => {
      if (action.payload.opacity === null) return;
      const i = action.payload.activeLayerIndex;
      state.list[i].opacity = action.payload.opacity;
    },
    changeLayerVisibility: (state, action: PayloadAction<number>) => {
      state.list[action.payload].visible = !state.list[action.payload].visible;
    },
    changeLayerName: (
      state,
      action: PayloadAction<{ i: number; name: string }>
    ) => {
      state.list[action.payload.i].name = action.payload.name;
    },
  },
});
