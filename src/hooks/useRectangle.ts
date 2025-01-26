import { useAppSelector } from '@/redux/hooks';
import React, { useCallback, useState } from 'react';
import { useSaveCanvasData } from './useSaveCanvasData';

interface Point {
  x: number;
  y: number;
}

export const useRectangle = (
  canvasElement: HTMLCanvasElement | null,
) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const color = useAppSelector(state => state.tools.color);
  const secondaryColor = useAppSelector(state => state.tools.secondaryColor);
  const { saveCanvasData } = useSaveCanvasData(canvasElement);

  const startDrawing = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!canvasElement) return;
      const canvasContext = canvasElement.getContext('2d');
      if (!canvasContext) return;

      // Save the current canvas state when starting to draw
      const currentImageData = canvasContext.getImageData(
        0,
        0,
        canvasContext.canvas.width,
        canvasContext.canvas.height,
      );
      setImageData(currentImageData);

      canvasContext.lineCap = 'square';
      canvasContext.lineJoin = 'miter';

      const { offsetX, offsetY } = event.nativeEvent;
      setStartPoint({ x: offsetX, y: offsetY });
      setIsDrawing(true);
      event.nativeEvent.preventDefault();
    }, [canvasElement]);

  const draw = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!isDrawing || !canvasElement || !startPoint || !imageData) return;
      const canvasContext = canvasElement.getContext('2d');
      if (!canvasContext) return;

      const { offsetX, offsetY } = event.nativeEvent;

      // Restore the previous state (without the preview rectangle)
      canvasContext.putImageData(imageData, 0, 0);

      // Calculate rectangle dimensions
      const width = offsetX - startPoint.x;
      const height = offsetY - startPoint.y;

      // Set styles
      canvasContext.strokeStyle = color;
      canvasContext.fillStyle = secondaryColor;

      // Draw preview rectangle
      canvasContext.beginPath();
      canvasContext.fillRect(startPoint.x, startPoint.y, width, height);
      canvasContext.strokeRect(startPoint.x, startPoint.y, width, height);

      event.nativeEvent.preventDefault();
    }, [isDrawing, canvasElement, startPoint, imageData, color, secondaryColor]);

  const stopDrawing = useCallback(() => {
    if (!canvasElement || !isDrawing) return;

    setIsDrawing(false);
    setStartPoint(null);
    setImageData(null);
    saveCanvasData();
  }, [canvasElement, isDrawing, saveCanvasData]);

  return { startDrawing, draw, stopDrawing };
};
