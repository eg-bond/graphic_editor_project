import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LayerT = {
  id: number;
  name: string;
  opacity: number;
  visible: boolean;
  active: boolean;
};

type InitialStateT = {
  layersList: Array<LayerT>;
  layerIdCount: number;
};

const initialState: InitialStateT = {
  layersList: [],
  layerIdCount: 0,
};

const NEW_LAYER_NAME = 'Cлой ';

export const layersSlice = createSlice({
  name: 'layers',
  initialState,
  reducers: {
    addLayer: state => {
      const newLayer: LayerT = {
        id: state.layerIdCount,
        name: NEW_LAYER_NAME + String(state.layerIdCount),
        opacity: 0,
        visible: true,
        active: false,
      };
      state.layerIdCount++;
      state.layersList.push(newLayer);
    },
    removeLayer: (state, action: PayloadAction<number>) => {
      const layerIndex = state.layersList.findIndex(
        layer => layer.id === action.payload
      );
      state.layersList.splice(layerIndex, 1);
    },
    activateLayer: (state, action: PayloadAction<number>) => {
      const prevActiveLayerId = state.layersList.findIndex(
        layer => layer.active === true
      );
      const newActiveLayerId = state.layersList.findIndex(
        layer => layer.id === action.payload
      );

      if (prevActiveLayerId === newActiveLayerId) return;

      if (prevActiveLayerId === -1) {
        state.layersList[newActiveLayerId].active = true;
        return;
      }
      state.layersList[prevActiveLayerId].active = false;
      state.layersList[newActiveLayerId].active = true;
    },
    changeOpacity: (
      state,
      action: PayloadAction<{ id: number; opacity: number }>
    ) => {
      const layerIndex = state.layersList.findIndex(
        layer => layer.id === action.payload.id
      );
      state.layersList[layerIndex].opacity = action.payload.opacity;
    },
    changeLayerVisibility: (state, action: PayloadAction<number>) => {
      const layerIndex = state.layersList.findIndex(
        layer => layer.id === action.payload
      );
      state.layersList[layerIndex].visible =
        !state.layersList[layerIndex].visible;
    },
    changeLayerName: (
      state,
      action: PayloadAction<{ id: number; name: string }>
    ) => {
      const layerIndex = state.layersList.findIndex(
        layer => layer.id === action.payload.id
      );
      state.layersList[layerIndex].name = action.payload.name;
    },
  },
});
