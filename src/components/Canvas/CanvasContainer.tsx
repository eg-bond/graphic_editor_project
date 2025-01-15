import { FC, useEffect, useRef } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { Canvas } from './Canvas';

export interface Layer {
  id: number;
  name: string;
  canvasData: string;
}

export interface CanvasState {
  layers: Layer[];
  activeLayerIndex: number;
}

interface CanvasProps {
  width: number;
  height: number;
}

export interface ICanvasContextRefs {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>;
}

export const CanvasContainer: FC<CanvasProps> = ({ width, height }) => {
  const layersList = useAppSelector(
    state => state.history.items?.[state.history.activeItemIndex]?.layersList,
  ) ?? [];
  const activeLayerIndex = useAppSelector(
    state => state.history.items[state.history.activeItemIndex]?.activeLayerIndex,
  );

  return (
    <Canvas
      // canvasRefs={canvasRefs}
      // contextRefs={contextRefs}
      layersList={layersList}
      activeLayerIndex={activeLayerIndex}
      width={width}
      height={height}
    />
  );
};
