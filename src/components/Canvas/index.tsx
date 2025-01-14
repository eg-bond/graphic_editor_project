import { Button } from 'antd';
import { FC, useEffect, useRef, useState } from 'react';
import { useSaveAndLoad } from './useSaveAndLoad';
import { useBrush } from './useBrush';

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

const LAYERS = [
  { id: 0, name: 'слой 0', canvasData: '' },
  { id: 1, name: 'слой 1', canvasData: '' },
  { id: 2, name: 'слой 2', canvasData: '' },
];
const ACTIVE_LI = 0;

export interface ICanvasContextRefs {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>;
}

export const Canvas: FC<CanvasProps> = ({ width, height }) => {
  const canvasRefs = useRef<{
    [key: string]: HTMLCanvasElement | null;
  }>({});
  const contextRefs = useRef<{
    [key: string]: CanvasRenderingContext2D;
  }>({});

  const [layersState, setLayersState] = useState<Layer[]>(LAYERS);
  const [activeLayerIndex, setActiveLayerIndex] = useState(ACTIVE_LI);

  useEffect(() => {
    Object.keys(canvasRefs.current).forEach((i) => {
      const canvas = canvasRefs.current[i];

      if (!canvas) return;

      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext('2d');

      if (!context) return;

      context.lineCap = 'round';
      context.strokeStyle = 'black';
      context.lineWidth = 5;
      contextRefs.current[i] = context;
    });
  }, [width, height]);

  const showData = () => {
    console.log(layersState);
    // console.log(canvasRefs.current[0].toDataURL('image/png'));
    // console.log(canvasRefs.current[1].toDataURL('image/png'));
    // console.log(canvasRefs.current[2].toDataURL('image/png'));
  };

  const {
    startDrawing,
    draw,
    stopDrawing,
  } = useBrush(contextRefs, activeLayerIndex);

  const {
    saveCanvasData,
    loadCanvasData,
    clearCanvas,
  } = useSaveAndLoad(
    canvasRefs, contextRefs,
    layersState, activeLayerIndex, setLayersState);

  const setToDraw = () => {
    if (!contextRefs.current[activeLayerIndex]) return;
    contextRefs.current[activeLayerIndex].globalCompositeOperation = 'source-over';
  };

  // const setToErase = () => {
  //   if (!contextRef.current) return;
  //   contextRef.current.globalCompositeOperation = 'destination-out';
  // };

  return (
    <div>
      <div
        className=" relative border border-black bg-white mx-auto"
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      >
        {layersState.map(layer => (
          <canvas
            key={layer.id}
            className="absolute top-0 left-0"
            style={{
              width: `${width}px`,
              height: `${height}px`,
            }}
            ref={el => canvasRefs.current[layer.id] = el}
          >
          </canvas>
        ))}
      </div>
      <div>
        <Button onClick={setToDraw}>
          Draw
        </Button>
        {/* <Button onClick={setToErase}>
          Erase
        </Button> */}
        <Button onClick={saveCanvasData}>Save</Button>
        <Button onClick={loadCanvasData}>Load</Button>
        <Button onClick={clearCanvas}>Clear</Button>
        <Button onClick={showData}>ShowData</Button>
      </div>
      <div className="layer-controls">
        {layersState.map(layer => (
          <Button
            onClick={() => setActiveLayerIndex(layer.id)}
            key={layer.id}
          >
            {layer.name}
          </Button>
        ))}
      </div>
    </div>
  );
};
