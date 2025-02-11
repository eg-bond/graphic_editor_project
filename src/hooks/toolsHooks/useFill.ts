import React, { useCallback } from 'react';
import { useAppSelector } from '@/redux/hooks.ts';
import { hexToRGBA } from '@/utils/hexToRgba.ts';
import { useSaveCanvasData } from '@/hooks/useSaveCanvasData.ts';

const getPixelColor = (x: number, y: number, data: ImageData['data'], canvas: HTMLCanvasElement) => {
  const index = (y * canvas.width + x) * 4;
  return [data[index], data[index + 1], data[index + 2], data[index + 3]];
};

const setPixelColor = (x: number, y: number, color: number[], data: ImageData['data'], canvas: HTMLCanvasElement) => {
  const index = (y * canvas.width + x) * 4;
  [data[index], data[index + 1], data[index + 2], data[index + 3]] = color;
};

const colorsMatch = <T>(c1: T[], c2: T[]) => {
  return c1.every((val, i) => val === c2[i]);
};

const floodFill = (x: number, y: number, targetColor: number[], fillColor: number[], data: ImageData['data'], canvas: HTMLCanvasElement) => {
  const stack = [[x, y]];
  while (stack.length) {
    const [px, py] = stack.pop()!;
    if (px < 0 || py < 0 || px >= canvas.width || py >= canvas.height) continue;
    if (!colorsMatch(getPixelColor(px, py, data, canvas), targetColor)) continue;

    setPixelColor(px, py, fillColor, data, canvas);
    stack.push([px + 1, py], [px - 1, py], [px, py + 1], [px, py - 1]);
  }
};

export const useFill = (
  canvas: HTMLCanvasElement | null,
) => {
  const { saveCanvasData } = useSaveCanvasData(canvas);
  const toolColor = useAppSelector(state => state.tools.color);

  const startDrawing = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) {
      return;
    }

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    const { offsetX, offsetY } = e.nativeEvent;
    const targetColor = getPixelColor(offsetX, offsetY, data, canvas);
    const fillColor = hexToRGBA(toolColor);
    if (!colorsMatch(targetColor, fillColor)) {
      floodFill(offsetX, offsetY, targetColor, fillColor, data, canvas);
      ctx.putImageData(imgData, 0, 0);
      saveCanvasData();
    }
  }, [canvas, toolColor]);

  const draw = () => {};

  const stopDrawing = () => {};

  return { startDrawing, draw, stopDrawing };
};
