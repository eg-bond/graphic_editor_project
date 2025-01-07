import { FC } from 'react';

interface CanvasProps {
  width: number,
  height: number,
}

export const Canvas: FC<CanvasProps> = ({ width, height }) => {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        border: '1px solid black',
        background: '#fff',
        margin: 'auto',
      }}
    ></div>
  );
};
