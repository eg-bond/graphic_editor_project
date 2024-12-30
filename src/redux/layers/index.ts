import { layersSlice } from "./layersSlice";

export const layersReducer = layersSlice.reducer;

export const {
  addLayer,
  removeLayer,
  activateLayer,
  changeOpacity,
  changeLayerVisibility,
  changeLayerName,
  setStateFromHistory,
  moveLayerUp,
  moveLayerDown,
  setRenameInputValue,
  setRenameError,
  resetRenameState
} = layersSlice.actions;
