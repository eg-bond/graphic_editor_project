import { FC, useEffect, useRef, useState } from 'react';

interface CanvasProps {
  width: number;
  height: number;
}

export const Canvas: FC<CanvasProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const [isDrawing, setIsDrawing] = useState(false);

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
        <button onClick={setToDraw}>
          Draw
        </button>
        <button onClick={setToErase}>
          Erase
        </button>
      </div>
    </div>
  );
};
