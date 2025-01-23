import { toolsSlice } from './toolsSlice.ts';
import { ToolKinds } from './toolsSlice.ts';

export const toolsReducer = toolsSlice.reducer;

export const {
  selectTool,
  selectColor,
  selectSecondaryColor,
} = toolsSlice.actions;

export { ToolKinds };
