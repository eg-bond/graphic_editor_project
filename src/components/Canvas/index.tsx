import { Button } from 'antd';
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

  const saveCanvasData = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Get the canvas data as a base64 string
    const canvasData = canvas.toDataURL('image/png');

    // Save to localStorage
    try {
      localStorage.setItem('savedCanvasData', canvasData);
      console.log('Canvas data saved successfully');
    } catch (error) {
      console.error('Error saving canvas data:', error);
    }
  };

  const loadCanvasData = (): void => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    // Get the saved data from localStorage
    const savedData = localStorage.getItem('savedCanvasData');
    if (!savedData) {
      console.log('No saved canvas data found');
      return;
    }

    // Create a new image with the saved data
    const image = new Image();
    image.onload = () => {
      // Clear the current canvas
      context.clearRect(0, 0, canvas.width, canvas.height);
      // Draw the loaded image
      context.drawImage(image, 0, 0);
    };
    image.src = savedData;
  };

  const clearCanvas = (): void => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
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
