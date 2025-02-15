import { toolsSlice } from './toolsSlice.ts';
import { ToolKinds } from './toolsSlice.ts';

export const toolsReducer = toolsSlice.reducer;

export const {
  resetTools,
  selectTool,
  selectColor,
  selectSecondaryColor,
  setLineWidth,
  lineWidthUp,
  lineWidthDown,
} = toolsSlice.actions;

export { ToolKinds };
