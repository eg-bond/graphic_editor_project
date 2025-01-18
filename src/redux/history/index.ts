import { historySlice } from './historySlice';

export const historyReducer = historySlice.reducer;

export const {
  activateHistoryItem,
  setProjectData,
  addLayer,
  activateLayer,
  changeOpacity,
  changeLayerVisibility,
  changeLayerName,
  removeLayer,
  moveLayerUp,
  moveLayerDown,
  setStateFromHistory,
  addDrawing,
} = historySlice.actions;

export * from './selectors.ts';
