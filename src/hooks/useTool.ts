import { useAppSelector } from '@/redux/hooks.ts';
import { useBrush } from '@/hooks/useBrush';
import { ToolKinds } from '@/redux/tools';
import { useEffect, useState } from 'react';
import { useRectangle } from './useRectangle';
import { selectActiveLayer } from '@/redux/history';
import { useCircle } from './useCircle';
import { useTriangle } from './useTriangle';
import { useLine } from './useLine';

export const useTool = (
  canvasElement: HTMLCanvasElement | null,
) => {
  const tool = useAppSelector(state => state.tools.tool);
  const activeLayer = useAppSelector(selectActiveLayer);

  const [, forceRender] = useState({});
  useEffect(() => {
    forceRender({});
  }, [canvasElement]);

  const {
    startDrawing: brushStartDrawing,
    draw: brushDraw,
    stopDrawing: brushStopDrawing,
  } = useBrush(canvasElement, false);

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

  const {
    startDrawing: circleStartDrawing,
    draw: circleDraw,
    stopDrawing: circleStopDrawing,
  } = useCircle(canvasElement);

  const {
    startDrawing: triangleStartDrawing,
    draw: triangleDraw,
    stopDrawing: triangleStopDrawing,
  } = useTriangle(canvasElement);

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

  if (tool === ToolKinds.Triangle) {
    return {
      startDrawing: triangleStartDrawing,
      draw: triangleDraw,
      stopDrawing: triangleStopDrawing,
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
    return {
      startDrawing: circleStartDrawing,
      draw: circleDraw,
      stopDrawing: circleStopDrawing,
    };
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
