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
  moveLayerUp,
  moveLayerDown,
  addDrawing,
  resizeCanvas,
  setStateFromHistory,
  layerUp,
  layerDown,
  moveLayer,
} = historySlice.actions;

export * from './selectors.ts';

export default historySlice.reducer;
