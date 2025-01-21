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
    startDrawing: brushStartDrwing,
    draw: brushDraw,
    stopDrawing: brushStopDrawing,
  } = useBrush(canvasContext, saveCanvasData);
  const {
    startDrawing,
    draw,
    stopDrawing,
  } = useLine(canvasContext, saveCanvasData, previewCtx);

  if (tool === ToolKinds.Brush) {
    return { startDrawing: brushStartDrwing, draw: brushDraw, stopDrawing: brushStopDrawing };
  }

  if (tool === ToolKinds.Line) {
    return { startDrawing, draw, stopDrawing };
  }

  if (tool === ToolKinds.Eraser) {
    return { startDrawing, draw, stopDrawing };
  }

  if (tool === ToolKinds.Circle) {
    return { startDrawing, draw, stopDrawing };
  }

  return { startDrawing, draw, stopDrawing };
};
