import { useEffect, useState } from 'react';

export const useBrush = (
  contextRefs: React.MutableRefObject<{
    [key: string]: CanvasRenderingContext2D;
  }>,
  activeLayerIndex: number,
) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const i = activeLayerIndex;

  const startDrawing = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { offsetX, offsetY } = event.nativeEvent;
    if (!contextRefs.current) return;

    contextRefs.current[i].beginPath();
    contextRefs.current[i].moveTo(offsetX, offsetY);
    contextRefs.current[i].lineTo(offsetX, offsetY);
    contextRefs.current[i].stroke();

    setIsDrawing(true);
    event.nativeEvent.preventDefault();
  };

  const draw = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDrawing || !contextRefs.current[i]) return;

    const { offsetX, offsetY } = event.nativeEvent;
    contextRefs.current[i].lineTo(offsetX, offsetY);
    contextRefs.current[i].stroke();
    event.nativeEvent.preventDefault();
  };

  const stopDrawing = () => {
    if (!contextRefs.current[i]) return;
    contextRefs.current[i].closePath();
    setIsDrawing(false);
  };

  return { startDrawing, draw, stopDrawing };
};
