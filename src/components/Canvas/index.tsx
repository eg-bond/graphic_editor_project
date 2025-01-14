import { Button } from 'antd';
import { FC, useEffect, useRef } from 'react';
import { useSaveAndLoad } from './useSaveAndLoad';
import { useBrush } from './useBrush';

interface CanvasProps {
  width: number;
  height: number;
}

export interface ICanvasContextRefs {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>;
}

export const Canvas: FC<CanvasProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 5;
    contextRef.current = context;
  }, [width, height]);

  const {
    startDrawing,
    draw,
    stopDrawing,
  } = useBrush(contextRef);

  const {
    saveCanvasData,
    loadCanvasData,
    clearCanvas,
  } = useSaveAndLoad(canvasRef, contextRef);

  const setToDraw = () => {
    if (!contextRef.current) return;
    contextRef.current.globalCompositeOperation = 'source-over';
  };

  const setToErase = () => {
    if (!contextRef.current) return;
    contextRef.current.globalCompositeOperation = 'destination-out';
  };

  return (
    <div>
      <canvas
        className="border border-black bg-white mx-auto"
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
        ref={canvasRef}
        onMouseDown={e => startDrawing(e)}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      >
      </canvas>
      <div>
        <Button onClick={setToDraw}>
          Draw
        </Button>
        <Button onClick={setToErase}>
          Erase
        </Button>
        <Button onClick={saveCanvasData}>Save</Button>
        <Button onClick={loadCanvasData}>Load</Button>
        <Button onClick={clearCanvas}>Clear</Button>
      </div>
    </div>
  );
};
