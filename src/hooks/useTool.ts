import { useAppSelector } from '@/redux/hooks.ts';
import { useBrush } from '@/hooks/useBrush.ts';
import { ToolKinds } from '@/redux/tools';
import { useLine } from '@/hooks/useLine.ts';
import { useEffect, useState } from 'react';

export const useTool = (
  canvasElement: HTMLCanvasElement | null,
) => {
  const tool = useAppSelector(state => state.tools.tool);

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
    startDrawing: lineStartDrawing,
    draw: lineDraw,
    stopDrawing: lineStopDrawing,
  } = useLine(canvasElement);

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
