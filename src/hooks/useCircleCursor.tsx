import React, { useMemo, useState } from 'react';
import { useAppSelector } from '@/redux/hooks.ts';

interface MousePosition {
  x: number;
  y: number;
}

export const useCircleCursor = () => {
  const size = useAppSelector(state => state.tools.lineWidth);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isMouseInCanvas, setIsMouseInCanvas] = useState(false);

  const updateMousePosition = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsMouseInCanvas(true);
  };

  const handleMouseLeave = () => {
    setIsMouseInCanvas(false);
  };

  const cursorElement = useMemo(() => {
    if (!isMouseInCanvas) return null;

    return (
      <div
        style={{
          position: 'absolute',
          width: size,
          height: size,
          backgroundColor: 'transparent',
          border: `1px solid black`,
          borderRadius: '50%',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          zIndex: 1000,
        }}
      />
    );
  }, [isMouseInCanvas, mousePosition.x, mousePosition.y, size]);

  return {
    updateMousePosition,
    handleMouseEnter,
    handleMouseLeave,
    cursorElement,
  };
};
