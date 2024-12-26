import { RootState } from '../store';

export const selectActiveLayer = (state: RootState) => {
  const activeLayerIndex = state.layers.activeLayerIndex;
  const activeLayer = state.layers.list[activeLayerIndex];
  return activeLayer;
};
