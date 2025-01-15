import { FC, useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { Canvas } from './Canvas';
import { store } from '@/redux/store';

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

  const [localLayers, setLocalLayers] = useState(layersList);

  return (
    <Canvas
      localLayers={localLayers}
      setLocalLayers={setLocalLayers}
      activeLayerIndex={activeLayerIndex}
      width={width}
      height={height}
    />
  );
};
