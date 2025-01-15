import { Button, ColorPicker } from 'antd';
import { FC, useEffect, useRef } from 'react';
import { useSaveAndLoad } from './useSaveAndLoad';
import { useBrush } from './useBrush';
import { LayerT } from '@/redux/history/historySlice';
import { AggregationColor } from 'antd/es/color-picker/color';

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

  const {
    saveCanvasData,
    loadCanvasData,
    clearCanvas,
  } = useSaveAndLoad(canvasRefs, contextRefs, localLayers, activeLayerIndex);

  const {
    startDrawing,
    draw,
    stopDrawing,
  } = useBrush(contextRefs, activeLayerIndex, saveCanvasData);

  useEffect(() => {
    Object.keys(canvasRefs.current).forEach((i) => {
      const canvas = canvasRefs.current[i];
      if (!canvas) return;

      const context = canvas.getContext('2d');
      if (!context) return;
      // context.lineCap = 'round';
      // context.strokeStyle = 'black';
      context.lineWidth = 5;
      contextRefs.current[i] = context;
      // !!!!!!!! makes history work, but not efficiently
      clearCanvas();
      loadCanvasData();
    });
    console.log('lay');
  }, [localLayers]);

  const showData = () => {
    // console.log(canvasRefs.current[0].toDataURL('image/png'));
    console.log(localLayers[0].canvasData);
  };

  const setToDraw = () => {
    if (!contextRefs.current[activeLayerIndex]) return;
    contextRefs.current[activeLayerIndex].globalCompositeOperation = 'source-over';
  };

  // const setToErase = () => {
  //   if (!contextRefs.current[activeLayerIndex]) return;
  //   contextRefs.current[activeLayerIndex].globalCompositeOperation = 'destination-out';
  // };

  const changeColor = (e: AggregationColor) => {
    Object.keys(contextRefs.current).forEach((i) => {
      contextRefs.current[i].strokeStyle = e.toHexString();
    });
  };

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
        {localLayers.map((layer, i) => {
          return (
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
          );
        })}
      </div>
      <div>
        <Button onClick={setToDraw}>
          Draw
        </Button>
        {/* <Button onClick={setToErase}>
          Erase
        </Button> */}
        <ColorPicker
          onChangeComplete={changeColor}
          defaultValue="black"
        />
        <Button onClick={saveCanvasData}>Save</Button>
        <Button onClick={loadCanvasData}>Load</Button>
        <Button onClick={clearCanvas}>Clear</Button>
        <Button onClick={showData}>ShowData</Button>
      </div>

    </div>
  );
};
