import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { historySlice, LayerT } from '../history/historySlice';

interface CanvasState {
  canvasLayers: LayerT[];
}

const initialState: CanvasState = {
  canvasLayers: [],
};

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    setInitialCanvasLayers: (state, action: PayloadAction<{
      layersList: LayerT[];
    }>) => {
      state.canvasLayers = action.payload.layersList;
    },
    updateLocalLayers: (state, action: PayloadAction<{
      index: number; canvasData: string;
    }>) => {
      state.canvasLayers[action.payload.index].canvasData = action.payload.canvasData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(historySlice.actions.addLayer, (state, action) => {
      // Update localLayers when a layer is added
        // state.localLayers = action.payload.layersList;
        console.log('addLayer');
      });
    // .addCase(historySlice.actions.removeLayer, (state, action) => {
    //   // Update localLayers when a layer is removed
    //   state.localLayers = action.payload.layersList;
    // })
    // .addCase(historySlice.actions.changeOpacity, (state, action) => {
    //   // Update localLayers when opacity changes
    //   state.localLayers = action.payload.layersList;
    // })
    // .addCase(historySlice.actions.changeLayerVisibility, (state, action) => {
    //   // Update localLayers when visibility changes
    //   state.localLayers = action.payload.layersList;
    // });
  },
});

export const { updateLocalLayers } = canvasSlice.actions;
export default canvasSlice.reducer;
