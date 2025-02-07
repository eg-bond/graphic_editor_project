import { useAppSelector } from '@/redux/hooks';
import React, { useCallback, useState } from 'react';
import { useSaveCanvasData } from './useSaveCanvasData';

interface Point {
  x: number;
  y: number;
}

export const useTriangle = (
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

      canvasContext.lineCap = 'square';
      canvasContext.lineJoin = 'miter';

      const { offsetX, offsetY } = event.nativeEvent;
      setStartPoint({ x: offsetX, y: offsetY });
      setIsDrawing(true);
      event.nativeEvent.preventDefault();
    },
    [canvasElement],
  );

  const draw = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!isDrawing || !canvasElement || !startPoint || !imageData) return;
      const canvasContext = canvasElement.getContext('2d', { willReadFrequently: true });
      if (!canvasContext) return;

      const { offsetX, offsetY } = event.nativeEvent;

      canvasContext.putImageData(imageData, 0, 0);

      const x1 = startPoint.x;
      const y1 = startPoint.y;
      const x2 = offsetX;
      const y2 = offsetY;
      const x3 = 2 * startPoint.x - offsetX;
      const y3 = offsetY;

      canvasContext.strokeStyle = color;
      canvasContext.fillStyle = secondaryColor;

      canvasContext.beginPath();
      canvasContext.moveTo(x1, y1);
      canvasContext.lineTo(x2, y2);
      canvasContext.lineTo(x3, y3);
      canvasContext.closePath();
      canvasContext.fill();
      canvasContext.stroke();

      event.nativeEvent.preventDefault();
    },
    [isDrawing, canvasElement, startPoint, imageData, color, secondaryColor],
  );

  const stopDrawing = useCallback(() => {
    if (!canvasElement || !isDrawing) return;

    setIsDrawing(false);
    setStartPoint(null);
    setImageData(null);
    saveCanvasData();
  }, [canvasElement, isDrawing, saveCanvasData]);

  return { startDrawing, draw, stopDrawing };
};
