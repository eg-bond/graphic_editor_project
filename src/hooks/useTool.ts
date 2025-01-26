import { useAppSelector } from '@/redux/hooks.ts';
import { useBrush } from '@/hooks/useBrush.ts';
import { ToolKinds } from '@/redux/tools';
import { useLine } from '@/hooks/useLine.ts';
import { useEffect, useState } from 'react';
import { useRectangle } from './useRectangel';
import { selectActiveLayer } from '@/redux/history';

export const useTool = (
  canvasElement: HTMLCanvasElement | null,
) => {
  const tool = useAppSelector(state => state.tools.tool);
  const activeLayer = useAppSelector(selectActiveLayer);

  // Форсируем ререндер, чтобы в canvasElement не было null
  const [, forceRender] = useState({});
  useEffect(() => {
    forceRender({});
  }, [canvasElement]);

  const {
    startDrawing: brushStartDrawing,
    draw: brushDraw,
    stopDrawing: brushStopDrawing,
  } = useBrush(canvasElement);

  const {
    startDrawing: eraserStartDrawing,
    draw: eraserDraw,
    stopDrawing: eraserStopDrawing,
  } = useBrush(canvasElement, true);

  const {
    startDrawing: lineStartDrawing,
    draw: lineDraw,
    stopDrawing: lineStopDrawing,
  } = useLine(canvasElement);

  const {
    startDrawing: rectStartDrawing,
    draw: rectDraw,
    stopDrawing: rectStopDrawing,
  } = useRectangle(canvasElement);

  if (!activeLayer) return {
    startDrawing: () => {}, draw: () => {}, stopDrawing: () => {},
  };

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
    return {
      startDrawing: eraserStartDrawing,
      draw: eraserDraw,
      stopDrawing: eraserStopDrawing,
    };
  }

  if (tool === ToolKinds.Circle) {
    // Аналогично для круга
  }

  if (tool === ToolKinds.Rect) {
    return {
      startDrawing: rectStartDrawing,
      draw: rectDraw,
      stopDrawing: rectStopDrawing,
    };
  }

  return { startDrawing: () => {}, draw: () => {}, stopDrawing: () => {} };
};
