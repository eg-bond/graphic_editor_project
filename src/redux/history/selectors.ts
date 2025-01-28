import { RootState } from '../store';

export const selectActiveLayer = (state: RootState) => {
  const activeIndex = state.history.activeItemIndex;
  const activeLayerIndex = state.history.items[activeIndex]?.activeLayerIndex ?? 0;
  return state.history.items[activeIndex]?.layersList?.[activeLayerIndex] ?? [];
};

export const selectActiveLayerIndex = (state: RootState) => {
  const activeIndex = state.history.activeItemIndex;
  return state.history.items[activeIndex]?.activeLayerIndex;
};

export const selectLayersList = (state: RootState) => {
  const activeIndex = state.history.activeItemIndex;
  return state.history.items[activeIndex]?.layersList ?? [];
};
