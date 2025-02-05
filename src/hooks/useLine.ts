import { useCallback, useState } from 'react';
import { useSaveCanvasData } from './useSaveCanvasData';

export const useLine = (canvasElement: HTMLCanvasElement | null) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<{
    x: number; y: number;
  } | null>(null);
  const { saveCanvasData } = useSaveCanvasData(canvasElement);

  // Store the original canvas state to enable preview
  const [originalImageData, setOriginalImageData] = useState<ImageData | null>(null);

  const startDrawing = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!canvasElement) return;
      const canvasContext = canvasElement.getContext('2d', { willReadFrequently: true });
      if (!canvasContext) return;

      const { offsetX, offsetY } = event.nativeEvent;

      canvasContext.lineCap = 'square';

      // Save the starting point
      setStartPoint({ x: offsetX, y: offsetY });

      // Store the current canvas state
      setOriginalImageData(
        canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height),
      );

      setIsDrawing(true);
      event.nativeEvent.preventDefault();
    },
    [canvasElement],
  );

  const draw = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!canvasElement || !isDrawing || !startPoint || !originalImageData) return;
    const canvasContext = canvasElement.getContext('2d', { willReadFrequently: true });
    if (!canvasContext) return;

    const { offsetX, offsetY } = event.nativeEvent;

    // Restore the original canvas state
    canvasContext.putImageData(originalImageData, 0, 0);

    // Draw the new line
    canvasContext.beginPath();
    canvasContext.moveTo(startPoint.x, startPoint.y);
    canvasContext.lineTo(offsetX, offsetY);
    canvasContext.stroke();

    event.nativeEvent.preventDefault();
  };

  const stopDrawing = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!canvasElement || !isDrawing || !startPoint) return;
    const canvasContext = canvasElement.getContext('2d', { willReadFrequently: true });
    if (!canvasContext) return;

    const { offsetX, offsetY } = event.nativeEvent;

    // Draw the final line
    canvasContext.beginPath();
    canvasContext.moveTo(startPoint.x, startPoint.y);
    canvasContext.lineTo(offsetX, offsetY);
    canvasContext.stroke();
    canvasContext.closePath();

    // Reset states
    setIsDrawing(false);
    setStartPoint(null);
    setOriginalImageData(null);

    // Save the canvas state
    saveCanvasData();
  };

  return {
    startDrawing,
    draw,
    stopDrawing,
  };
};
