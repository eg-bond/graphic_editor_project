import { layersSlice } from './layersSlice';

export const layersReducer = layersSlice.reducer;

export const { addLayer, removeLayer, activateLayer, changeOpacity } =
  layersSlice.actions;
