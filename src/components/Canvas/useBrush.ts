import { useState } from 'react';
import { ICanvasContextRefs } from '.';

export const useBrush = (
  contextRef: ICanvasContextRefs['contextRef'],
) => {
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const { offsetX, offsetY } = event.nativeEvent;
    if (!contextRef.current) return;

    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    setIsDrawing(true);
    event.nativeEvent.preventDefault();
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!isDrawing || !contextRef.current) return;

    const { offsetX, offsetY } = event.nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    event.nativeEvent.preventDefault();
  };

  const stopDrawing = () => {
    if (!contextRef.current) return;
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  return { startDrawing, draw, stopDrawing };
};
