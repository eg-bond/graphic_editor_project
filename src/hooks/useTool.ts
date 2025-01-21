import { useAppSelector } from '@/redux/hooks.ts';
import { useBrush } from '@/hooks/useBrush.ts';
import { ToolKinds } from '@/redux/tools';
import { useLine } from '@/hooks/useLine.ts';

export const useTool = (
  canvasContext: CanvasRenderingContext2D,
  saveCanvasData: () => void,
  previewCtx: CanvasRenderingContext2D | null,
) => {
  const tool = useAppSelector(state => state.tools.tool);

  const {
    startDrawing: brushStartDrawing,
    draw: brushDraw,
    stopDrawing: brushStopDrawing,
  } = useBrush(canvasContext, saveCanvasData);

  const {
    startDrawing: lineStartDrawing,
    draw: lineDraw,
    stopDrawing: lineStopDrawing,
  } = useLine(canvasContext, saveCanvasData, previewCtx);

  if (tool === ToolKinds.Brush) {
    return {
      startDrawing: brushStartDrawing,
      draw: brushDraw,
      stopDrawing: brushStopDrawing,
    };
  }

  if (tool === ToolKinds.Line) {
    return {
      startDrawing: lineStartDrawing,
      draw: lineDraw,
      stopDrawing: lineStopDrawing,
    };
  }

  if (tool === ToolKinds.Eraser) {
    // Аналогично для ластика
  }

  if (tool === ToolKinds.Circle) {
    // Аналогично для круга
  }

  if (tool === ToolKinds.Rect) {
    // Аналогично для квадрата
  }

  return { startDrawing: () => {}, draw: () => {}, stopDrawing: () => {} };
};
