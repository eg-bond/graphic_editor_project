import { useCallback, useState } from 'react';

export const useBrush = (
  canvasContext: CanvasRenderingContext2D,
  saveCanvasData: () => void,
) => {
  const [isDrawing, setIsDrawing] = useState(false);
  // console.log('useBrush');
  // console.log(canvasContext);

  const startDrawing = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!canvasContext) return;

    const { offsetX, offsetY } = event.nativeEvent;
    canvasContext.beginPath();
    canvasContext.moveTo(offsetX, offsetY);
    canvasContext.lineTo(offsetX, offsetY);
    canvasContext.stroke();
    setIsDrawing(true);
    event.nativeEvent.preventDefault();
  }, [canvasContext]);

  const draw = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDrawing || !canvasContext) return;

    const { offsetX, offsetY } = event.nativeEvent;
    canvasContext.lineTo(offsetX, offsetY);
    canvasContext.stroke();
    event.nativeEvent.preventDefault();
  };

  const stopDrawing = () => {
    if (!canvasContext) return;
    canvasContext.closePath();

    if (isDrawing) {
      saveCanvasData();
      setIsDrawing(false);
    }
  };

  return { startDrawing, draw, stopDrawing };
};
