import { useCallback, useState } from 'react';
import { useSaveCanvasData } from '../useSaveCanvasData';

export const useMoveDrawing = (
  canvasElement: HTMLCanvasElement | null,
) => {
  const [isMoving, setIsMoving] = useState(false);
  const [startPoint, setStartPoint] = useState<{
    x: number; y: number;
  } | null>(null);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const { saveCanvasData } = useSaveCanvasData(canvasElement);

  const startMoving = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!canvasElement) return;
      const canvasContext = canvasElement.getContext('2d', { willReadFrequently: true });
      if (!canvasContext) return;

      const { offsetX, offsetY } = event.nativeEvent;

      // Store the initial click position
      setStartPoint({ x: offsetX, y: offsetY });

      // Store the current canvas state
      const currentImageData = canvasContext.getImageData(
        0,
        0,
        canvasContext.canvas.width,
        canvasContext.canvas.height,
      );
      setImageData(currentImageData);

      setIsMoving(true);
      event.nativeEvent.preventDefault();
    },
    [canvasElement],
  );

  const move = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!isMoving || !canvasElement || !startPoint || !imageData) return;
      const canvasContext = canvasElement.getContext('2d', { willReadFrequently: true });
      if (!canvasContext) return;

      const { offsetX, offsetY } = event.nativeEvent;

      // Calculate the distance moved
      const dx = offsetX - startPoint.x;
      const dy = offsetY - startPoint.y;

      // Clear the canvas
      canvasContext.clearRect(
        0,
        0,
        canvasContext.canvas.width,
        canvasContext.canvas.height,
      );

      // Create a temporary canvas to handle the movement
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvasContext.canvas.width;
      tempCanvas.height = canvasContext.canvas.height;
      const tempContext = tempCanvas.getContext('2d');

      if (tempContext) {
        // Put the original image data on the temporary canvas
        tempContext.putImageData(imageData, 0, 0);

        // Draw the temporary canvas onto the main canvas with offset
        canvasContext.save();
        canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
        canvasContext.drawImage(tempCanvas, dx, dy);
        canvasContext.restore();
      }

      event.nativeEvent.preventDefault();
    },
    [isMoving, canvasElement, startPoint, imageData],
  );

  const stopMoving = useCallback(() => {
    if (!canvasElement || !isMoving) return;
    const canvasContext = canvasElement.getContext('2d');
    if (!canvasContext) return;

    // Save the final state
    saveCanvasData();

    // Reset the states
    setIsMoving(false);
    setStartPoint(null);
    setImageData(null);
  }, [canvasElement, isMoving, saveCanvasData]);

  return { startMoving, move, stopMoving };
};
