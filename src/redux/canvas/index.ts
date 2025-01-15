import { canvasSlice } from './canvasSlice.ts';

export const canvasReducer = canvasSlice.reducer;

export const { setInitialCanvasLayers, updateLocalLayers } = canvasSlice.actions;
