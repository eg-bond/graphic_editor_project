import { useSaveCanvasData } from './useSaveCanvasData';
import React, { useCallback, useState } from 'react';

export const useBrush = (canvasElement: HTMLCanvasElement | null, eraserMode?: boolean) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const { saveCanvasData } = useSaveCanvasData(canvasElement);

  const startDrawing = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!canvasElement) return;
      const canvasContext = canvasElement.getContext('2d');
      if (!canvasContext) return;

      const { offsetX, offsetY } = event.nativeEvent;
      canvasContext.beginPath();
      canvasContext.moveTo(offsetX, offsetY);
      canvasContext.lineTo(offsetX, offsetY);
      canvasContext.stroke();
      setIsDrawing(true);
      event.nativeEvent.preventDefault();
    }, [canvasElement]);

  const draw = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!canvasElement) return;
    const canvasContext = canvasElement.getContext('2d');
    if (!isDrawing || !canvasContext) return;

    const { strokeStyle } = canvasContext;

    if (eraserMode) {
      canvasContext.strokeStyle = '#ffffff';
    }

    const { offsetX, offsetY } = event.nativeEvent;
    canvasContext.lineTo(offsetX, offsetY);
    canvasContext.stroke();
    event.nativeEvent.preventDefault();
    canvasContext.strokeStyle = strokeStyle;
  };

  const stopDrawing = () => {
    if (!canvasElement) return;
    const canvasContext = canvasElement.getContext('2d');
    if (!canvasContext) return;
    canvasContext.closePath();

    if (isDrawing) {
      saveCanvasData();
      setIsDrawing(false);
    }
  };

  return { startDrawing, draw, stopDrawing };
};
