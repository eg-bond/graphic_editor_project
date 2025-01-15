import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Canvas } from './Canvas';
import { setInitialCanvasLayers } from '@/redux/canvas';

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
  const d = useAppDispatch();
  const layersList = useAppSelector(
    state => state.history.items?.[state.history.activeItemIndex]?.layersList,
  ) ?? [];
  const activeLayerIndex = useAppSelector(
    state => state.history.items[state.history.activeItemIndex]?.activeLayerIndex,
  );
  // const canvasLayers = useAppSelector(
  //   state => state.canvas.canvasLayers,
  // ) ?? layersList;

  useEffect(() => {
    d(setInitialCanvasLayers({ layersList }));
  }, []);

  // const [localLayers, setLocalLayers] = useState(layersList);

  return (
    <Canvas
      localLayers={layersList}
      // setLocalLayers={setLocalLayers}
      activeLayerIndex={activeLayerIndex}
      width={width}
      height={height}
    />
  );
};
