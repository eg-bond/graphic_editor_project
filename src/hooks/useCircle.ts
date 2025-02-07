import { useAppSelector } from '@/redux/hooks';
import React, { useCallback, useState } from 'react';
import { useSaveCanvasData } from './useSaveCanvasData';

interface Point {
  x: number;
  y: number;
}

export const useCircle = (
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
      const canvasContext = canvasElement.getContext('2d', { willReadFrequently: true });
      if (!canvasContext) return;

      const currentImageData = canvasContext.getImageData(
        0,
        0,
        canvasContext.canvas.width,
        canvasContext.canvas.height,
      );
      setImageData(currentImageData);

      const { offsetX, offsetY } = event.nativeEvent;
      setStartPoint({ x: offsetX, y: offsetY });
      setIsDrawing(true);
      event.nativeEvent.preventDefault();
    }, [canvasElement]);

  const draw = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!isDrawing || !canvasElement || !startPoint || !imageData) return;
      const canvasContext = canvasElement.getContext('2d', { willReadFrequently: true });
      if (!canvasContext) return;

      const { offsetX, offsetY } = event.nativeEvent;

      canvasContext.putImageData(imageData, 0, 0);

      const radiusX = Math.abs(offsetX - startPoint.x) / 2;
      const radiusY = Math.abs(offsetY - startPoint.y) / 2;
      const centerX = startPoint.x + (offsetX - startPoint.x) / 2;
      const centerY = startPoint.y + (offsetY - startPoint.y) / 2;

      canvasContext.strokeStyle = color;
      canvasContext.fillStyle = secondaryColor;

      canvasContext.beginPath();
      canvasContext.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
      canvasContext.fill();
      canvasContext.stroke();

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
