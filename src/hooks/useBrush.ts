import { useSaveCanvasData } from './useSaveCanvasData';
import React, { useCallback, useState } from 'react';

export const useBrush = (
  canvasElement: HTMLCanvasElement | null,
  eraserMode: boolean,
) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const { saveCanvasData } = useSaveCanvasData(canvasElement);

  const startDrawing = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!canvasElement) return;
      const canvasContext = canvasElement.getContext('2d', { willReadFrequently: true });
      if (!canvasContext) return;

      const { offsetX, offsetY } = event.nativeEvent;

      if (eraserMode) {
        canvasContext.globalCompositeOperation = 'destination-out';
      } else {
        canvasContext.globalCompositeOperation = 'source-over';
      }

      canvasContext.beginPath();
      canvasContext.moveTo(offsetX, offsetY);
      canvasContext.lineTo(offsetX, offsetY);

      // Make the brush round
      canvasContext.lineCap = 'round';
      canvasContext.lineJoin = 'round';

      canvasContext.stroke();
      setIsDrawing(true);
      event.nativeEvent.preventDefault();
    }, [canvasElement, eraserMode]);

  const draw = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!canvasElement) return;
    const canvasContext = canvasElement.getContext('2d', { willReadFrequently: true });
    if (!isDrawing || !canvasContext) return;

    const { strokeStyle } = canvasContext;

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

    canvasContext.globalCompositeOperation = 'source-over';
  };

  return { startDrawing, draw, stopDrawing };
};
