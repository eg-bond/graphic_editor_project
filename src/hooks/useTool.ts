import { useAppSelector } from '@/redux/hooks.ts';
import { useBrush } from '@/hooks/useBrush';
import { ToolKinds } from '@/redux/tools';
import { useEffect, useState } from 'react';
import { useRectangle } from './useRectangle';
import { selectWidthAndHeight } from '@/redux/history';
import { useCircle } from './useCircle';
import { useTriangle } from './useTriangle';
import { useLine } from './useLine';
import { useMoveDrawing } from './useMoveDrawing';

export const useTool = (
  canvasElement: HTMLCanvasElement | null,
) => {
  const tool = useAppSelector(state => state.tools.tool);
  const toolColor = useAppSelector(state => state.tools.color);
  const lineWidth = useAppSelector(state => state.tools.lineWidth);
  const { width, height } = useAppSelector(selectWidthAndHeight);

  useEffect(() => {
    if (!canvasElement) return;
    const ctx = canvasElement.getContext('2d');
    if (!ctx) return;
    ctx.lineWidth = lineWidth;
  }, [lineWidth, width, height, canvasElement]);

  useEffect(() => {
    if (!canvasElement) return;
    const ctx = canvasElement.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = toolColor;
  }, [toolColor, width, height, canvasElement]);

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

  const {
    startMoving,
    move,
    stopMoving,
  } = useMoveDrawing(canvasElement);

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

  if (tool === ToolKinds.Move) {
    return {
      startDrawing: startMoving,
      draw: move,
      stopDrawing: stopMoving,
    };
  }

  return { startDrawing: () => {}, draw: () => {}, stopDrawing: () => {} };
};
