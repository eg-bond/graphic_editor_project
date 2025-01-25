import {
  DEFAULT_TOOLS_COLOR,
  DEFAULT_TOOLS_SECONDARY_COLOR,
} from '@/utils/constants';
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
  // цвет заливки фигур
  secondaryColor: string;
  lineWidth: number;
}

const initialState: ToolsSliceState = {
  tool: ToolKinds.Brush,
  color: DEFAULT_TOOLS_COLOR,
  secondaryColor: DEFAULT_TOOLS_SECONDARY_COLOR,
  lineWidth: 5,
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
    selectSecondaryColor: (state, action: PayloadAction<{
      color: string;
    }>) => {
      state.secondaryColor = action.payload.color;
    },
    setLineWidth: (state, action: PayloadAction<number>) => {
      state.lineWidth = action.payload;
    },
  },
});
