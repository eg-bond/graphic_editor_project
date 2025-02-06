import { historySlice } from './historySlice';

export const historyReducer = historySlice.reducer;

export const {
  setProjectData,
  activateHistoryItem,
  addLayer,
  removeLayer,
  activateLayer,
  changeOpacity,
  changeLayerVisibility,
  changeLayerName,
  addDrawing,
  setStateFromHistory,
  layerUp,
  layerDown,
  moveLayer,
  resizeCanvas,
} = historySlice.actions;

export * from './selectors.ts';

export default historySlice.reducer;
