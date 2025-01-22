import React, { useCallback, useEffect, useState } from 'react';
import { useSaveCanvasData } from './useSaveCanvasData';

export const useLine = (canvasElement: HTMLCanvasElement | null) => {
  const { saveCanvasData } = useSaveCanvasData(canvasElement);
  const [startPoint, setStartPoint] = useState<{
    x: number; y: number;
  } | null>(null);
  const [currentPoint, setCurrentPoint] = useState<{
    x: number; y: number;
  } | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      setStartPoint({ x: event.clientX - rect.left, y: event.clientY - rect.top });
      setIsDrawing(true);
    }, []);

  const draw = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDrawing) return;

    const rect = event.currentTarget.getBoundingClientRect();
    setCurrentPoint({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  }, [isDrawing]);

  const stopDrawing = useCallback(() => {
    if (isDrawing) {
      saveCanvasData();
      setIsDrawing(false);
      setStartPoint(null);
      setCurrentPoint(null);
    }
  }, [isDrawing, saveCanvasData]);

  useEffect(() => {
    if (!isDrawing || !startPoint || !currentPoint) return;

    if (!canvasElement) return;
    const canvasContext = canvasElement.getContext('2d');

    if (!canvasContext) return;

    canvasContext.clearRect(0, 0, 10000, 10000);

    canvasContext.beginPath();
    canvasContext.moveTo(startPoint.x, startPoint.y);
    canvasContext.lineTo(currentPoint.x, currentPoint.y);
    canvasContext.stroke();
  }, [currentPoint, isDrawing, startPoint, canvasElement]);

  return { startDrawing, draw, stopDrawing };
};
