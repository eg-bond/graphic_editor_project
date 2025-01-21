import React, { useCallback, useEffect, useState } from 'react';

export const useLine = (
  ctx: CanvasRenderingContext2D,
  saveCanvasData: () => void,
  previewCtx: CanvasRenderingContext2D | null,
) => {
  const [startPoint, setStartPoint] = useState<{
    x: number; y: number;
  } | null>(null);
  const [currentPoint, setCurrentPoint] = useState<{
    x: number; y: number;
  } | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ctx) return;

    const rect = event.currentTarget.getBoundingClientRect();
    setStartPoint({ x: event.clientX - rect.left, y: event.clientY - rect.top });
    setIsDrawing(true);
  }, [ctx]);

  const draw = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDrawing) return;

    const rect = event.currentTarget.getBoundingClientRect();
    setCurrentPoint({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  }, [isDrawing]);

  const stopDrawing = useCallback(() => {
    if (isDrawing && startPoint && currentPoint) {
      ctx.beginPath();
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.lineTo(currentPoint.x, currentPoint.y);
      ctx.stroke();

      saveCanvasData();
    }

    setIsDrawing(false);
    setStartPoint(null);
    setCurrentPoint(null);

    if (!previewCtx) return;
    previewCtx.clearRect(0, 0, 10000, 10000);
  }, [ctx, currentPoint, isDrawing, saveCanvasData, startPoint, previewCtx]);

  useEffect(() => {
    if (!isDrawing || !startPoint || !currentPoint || !previewCtx) return;

    previewCtx.clearRect(0, 0, 10000, 10000);

    previewCtx.beginPath();
    previewCtx.moveTo(startPoint.x, startPoint.y);
    previewCtx.lineTo(currentPoint.x, currentPoint.y);
    previewCtx.stroke();
  }, [currentPoint, isDrawing, previewCtx, startPoint]);

  return { startDrawing, draw, stopDrawing };
};
