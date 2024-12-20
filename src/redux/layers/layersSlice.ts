import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LayerT = {
  id: number;
  name: string;
  opacity: number;
  visible: boolean;
  active: boolean;
};

const initialState: Array<LayerT> = [
  { id: 0, name: 'Слой 1', opacity: 0, visible: true, active: false },
  { id: 1, name: 'Слой 2', opacity: 0, visible: true, active: false },
  { id: 2, name: 'Слой 3', opacity: 0, visible: true, active: false },
  { id: 3, name: 'Слой 4', opacity: 0, visible: true, active: false },
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
  },
});
