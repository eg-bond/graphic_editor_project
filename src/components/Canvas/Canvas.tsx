import { Button } from 'antd';
import { FC, useEffect, useRef } from 'react';
import { useSaveAndLoad } from './useSaveAndLoad';
import { useBrush } from './useBrush';
import { LayerT } from '@/redux/history/historySlice';
import { useAppSelector } from '@/redux/hooks';

export interface ICanvasProps {
  localLayers: LayerT[];
  activeLayerIndex: number;
  width: number;
  height: number;
}

export const Canvas: FC<ICanvasProps> = ({
  localLayers,
  activeLayerIndex,
  width,
  height,
}) => {
  const canvasRefs = useRef<{
    [key: string]: HTMLCanvasElement | null;
  }>({});
  const contextRefs = useRef<{
    [key: string]: CanvasRenderingContext2D;
  }>({});

  const toolColor = useAppSelector(state => state.tools.color);

  useEffect(() => {
    Object.keys(canvasRefs.current).forEach((i) => {
      const canvas = canvasRefs.current[i];
      if (!canvas) return;

      const context = canvas.getContext('2d');
      if (!context) return;
      // context.lineCap = 'round';
      context.lineWidth = 5;
      contextRefs.current[i] = context;

      loadCanvasData();
    });
  }, [localLayers]);

  // changes color of canvas contexsts -----------------
  // const changeColor = (color: string) => {
  //   Object.keys(contextRefs.current).forEach((i) => {
  //     contextRefs.current[i].strokeStyle = color;
  //   });
  // };
  useEffect(() => {
    Object.keys(contextRefs.current).forEach((i) => {
      contextRefs.current[i].strokeStyle = toolColor;
    });
  }, [toolColor]);

  // context of canvas element, linked to activeLayerIndex
  const canvasContext = contextRefs.current[activeLayerIndex];

  const {
    saveCanvasData,
    loadCanvasData,
    clearCanvas,
  } = useSaveAndLoad(canvasRefs, contextRefs, localLayers, activeLayerIndex);

  const {
    startDrawing,
    draw,
    stopDrawing,
  } = useBrush(canvasContext, saveCanvasData);

  const setToDraw = () => {
    if (!contextRefs.current[activeLayerIndex]) return;
    contextRefs.current[activeLayerIndex].globalCompositeOperation = 'source-over';
  };

  // const setToErase = () => {
  //   if (!contextRefs.current[activeLayerIndex]) return;
  //   contextRefs.current[activeLayerIndex].globalCompositeOperation = 'destination-out';
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
        {localLayers.map((layer, i) => (
          <canvas
            key={layer.id}
            className="absolute top-0 left-0"
            style={{
              width: `${width}px`,
              height: `${height}px`,
              zIndex: 100 - i,
              opacity: layer.opacity / 100,
              display: layer.visible ? 'block' : 'none',
            }}
            width={width}
            height={height}
            ref={el => canvasRefs.current[i] = el}
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
      </div>

    </div>
  );
};
