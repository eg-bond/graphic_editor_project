import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LayerT = {
  id: number;
  name: string;
  opacity: number;
  visible: boolean;
  active: boolean;
};

const initialState: Array<LayerT> = [
  { id: 0, name: 'Слой 1', opacity: 10, visible: true, active: false },
  { id: 1, name: 'Слой 2', opacity: 20, visible: true, active: false },
  { id: 2, name: 'Слой 3', opacity: 30, visible: true, active: false },
  { id: 3, name: 'Слой 4', opacity: 40, visible: true, active: false },
];

const NEW_LAYER_NAME = 'Cлой ';

export const layersSlice = createSlice({
  name: 'layers',
  initialState,
  reducers: {
    addLayer: state => {
      const newtLayerId = state.length + 1;
      const newLayer: LayerT = {
        id: newtLayerId,
        name: NEW_LAYER_NAME + String(newtLayerId),
        opacity: 0,
        visible: true,
        active: false,
      };
      state.push(newLayer);
    },
    removeLayer: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1);
    },
    activateLayer: (state, action: PayloadAction<number>) => {
      const prevActiveLayerId = state.findIndex(layer => layer.active === true);
      const newActiveLayerId = state.findIndex(
        layer => layer.id === action.payload
      );

      if (prevActiveLayerId === newActiveLayerId) return;

      if (prevActiveLayerId === -1) {
        state[newActiveLayerId].active = true;
        return;
      }
      state[prevActiveLayerId].active = false;
      state[newActiveLayerId].active = true;
    },
    changeOpacity: (
      state,
      action: PayloadAction<{ id: number; opacity: number }>
    ) => {
      state[action.payload.id].opacity = action.payload.opacity;
    },
    changeLayerVisibility: (state, action: PayloadAction<number>) => {
      state[action.payload].visible = !state[action.payload].visible;
    },
  },
});
