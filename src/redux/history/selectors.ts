import { RootState } from '../store';

export const selectActiveLayer = (state: RootState) => {
  const activeIndex = state.history.activeItemIndex;
  const activeLayerIndex = state.history.items[activeIndex]?.activeLayerIndex ?? 0;
  return state.history.items[activeIndex]?.layersList?.[activeLayerIndex];
};
