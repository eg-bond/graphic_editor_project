import { useMemo, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export const useCircleCursor = () => {
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
          // Размеры курсора в будущем должны меняться в зависимости от толщины инструмента
          width: `${10}px`,
          height: `${10}px`,
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
  }, [isMouseInCanvas, mousePosition.x, mousePosition.y]);

  return {
    updateMousePosition,
    handleMouseEnter,
    handleMouseLeave,
    cursorElement,
  };
};
