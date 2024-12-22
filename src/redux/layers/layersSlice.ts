import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LayerT = {
  id: number;
  name: string;
  opacity: number;
  visible: boolean;
  active: boolean;
};

type InitialStateT = {
  list: Array<LayerT>;
  layerIdCount: number;
};

const initialState: InitialStateT = {
  list: [],
  layerIdCount: 0,
};

const NEW_LAYER_NAME = 'Cлой ';

const findLayerIndex = (layers: Array<LayerT>, id: number): number => {
  return layers.findIndex(layer => layer.id === id);
};

export const layersSlice = createSlice({
  name: 'layers',
  initialState,
  reducers: {
    addLayer: state => {
      const newLayer: LayerT = {
        id: state.layerIdCount,
        name: NEW_LAYER_NAME + String(state.layerIdCount),
        opacity: 100,
        visible: true,
        active: false,
      };
      state.layerIdCount++;
      state.list.push(newLayer);
    },
    removeLayer: (state, action: PayloadAction<number>) => {
      const layerIndex = findLayerIndex(state.list, action.payload);
      state.list.splice(layerIndex, 1);
    },
    activateLayer: (state, action: PayloadAction<number>) => {
      const prevActiveLayerId = state.list.findIndex(
        layer => layer.active === true
      );
      const newActiveLayerId = findLayerIndex(state.list, action.payload);

      if (prevActiveLayerId === -1) {
        state.list[newActiveLayerId].active = true;
        return;
      }
      state.list[prevActiveLayerId].active = false;
      state.list[newActiveLayerId].active = true;
    },
    changeOpacity: (
      state,
      action: PayloadAction<{ id: number | undefined; opacity: number }>
    ) => {
      if (action.payload.id === undefined) return;
      if (action.payload.opacity === null) return;
      const layerIndex = findLayerIndex(state.list, action.payload.id);
      state.list[layerIndex].opacity = action.payload.opacity;
    },
    changeLayerVisibility: (state, action: PayloadAction<number>) => {
      const layerIndex = findLayerIndex(state.list, action.payload);
      state.list[layerIndex].visible = !state.list[layerIndex].visible;
    },
    changeLayerName: (
      state,
      action: PayloadAction<{ id: number; name: string }>
    ) => {
      const layerIndex = findLayerIndex(state.list, action.payload.id);
      state.list[layerIndex].name = action.payload.name;
    },
  },
});
