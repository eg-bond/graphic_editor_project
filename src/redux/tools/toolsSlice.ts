import {
  DEFAULT_TOOLS_COLOR,
  DEFAULT_TOOLS_SECONDARY_COLOR,
} from '@/utils/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum ToolKinds {
  Brush = 'brush',
  Fill = 'fill',
  Line = 'line',
  Rect = 'rect',
  Circle = 'circle',
  Eraser = 'eraser',
  Triangle = 'triangle',
  Move = 'move',
}

interface ToolsSliceState {
  tool: ToolKinds | null;
  color: string;
  // цвет заливки фигур
  secondaryColor: string;
  lineWidth: number;
}

export const LINE_WIDTH_MIN = 1;
export const LINE_WIDTH_MAX = 25;

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
    resetTools: () => initialState,
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
    lineWidthUp: (state) => {
      if (state.lineWidth < LINE_WIDTH_MAX) {
        state.lineWidth++;
      }
    },
    lineWidthDown: (state) => {
      if (state.lineWidth > LINE_WIDTH_MIN) {
        state.lineWidth--;
      }
    },
  },
});
