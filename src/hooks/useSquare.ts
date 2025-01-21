import { useCallback, useState } from 'react';

export const useSquare = (
  canvasContext: CanvasRenderingContext2D,
  saveCanvasData: () => void,
) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{
    x: number; y: number;
  } | null>(null);

  const startDrawing = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!canvasContext) return;

      const { offsetX, offsetY } = event.nativeEvent;
      setStartPos({ x: offsetX, y: offsetY });
      setIsDrawing(true);
      event.nativeEvent.preventDefault();
    },
    [canvasContext],
  );

  const draw = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDrawing || !canvasContext || !startPos) return;

    const { offsetX, offsetY } = event.nativeEvent;

    const width = offsetX - startPos.x;
    const height = offsetY - startPos.y;

    canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);

    canvasContext.beginPath();
    canvasContext.strokeRect(startPos.x, startPos.y, width, height);
  };

  const stopDrawing = useCallback(() => {
    if (!canvasContext || !isDrawing || !startPos) return;
    canvasContext.closePath();

    saveCanvasData();
    setIsDrawing(false);
    setStartPos(null);
  }, [canvasContext, isDrawing, saveCanvasData, startPos]);

  return { startDrawing, draw, stopDrawing };
};
