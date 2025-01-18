import { DEFAULT_TOOLS_COLOR } from '@/utils/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum ToolKinds {
  Brush = 'brush',
  Line = 'line',
  Rect = 'rect',
  Circle = 'circle',
  Eraser = 'eraser',
}

interface ToolsSliceState {
  tool: ToolKinds | null;
  color: string;
}

const initialState: ToolsSliceState = {
  tool: null,
  color: DEFAULT_TOOLS_COLOR,
};

export const toolsSlice = createSlice({
  name: 'tools',
  initialState,
  reducers: {
    selectTool: (state, action: PayloadAction<{
      tool: ToolKinds;
    }>) => {
      state.tool = action.payload.tool;
    },
    selectColor: (state, action: PayloadAction<{
      color: string;
    }>) => {
      state.color = action.payload.color;
    },
  },
});
