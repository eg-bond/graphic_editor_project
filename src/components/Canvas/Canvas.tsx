import { FC, useEffect, useRef } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { useTool } from '@/hooks/useTool.ts';
import { LayersCanvasData } from './LayersCanvasData';
import { selectActiveLayerIndex } from '@/redux/history';
import { useCircleCursor } from '@/hooks/useCircleCursor';

export const Canvas: FC = () => {
  const { width, height } = useAppSelector(state => state.project);
  const activeLayerIndex = useAppSelector(selectActiveLayerIndex);
  const toolColor = useAppSelector(state => state.tools.color);
  const lineWidth = useAppSelector(state => state.tools.lineWidth);

  // Реф для хранения используемого для рисования canvas элемента
  const canvasElementRef = useRef<HTMLCanvasElement | null>(null);

  // Эффект, который устанавливавает lineWidth (в будущем должен изменяться
  // в зависимости от толщины инструмента, установленной в toolsSlice)
  useEffect(() => {
    if (!canvasElementRef.current) return;
    const ctx = canvasElementRef.current.getContext('2d');
    if (!ctx) return;
    ctx.lineWidth = lineWidth;
    // зависимости width и height нужны, чтобы при ресайзе холста lineWidth не сбрасывался
  }, [lineWidth, width, height]);

  // Эффект, меняющий цвет кисти canvas элемента при изменении toolColor
  useEffect(() => {
    if (!canvasElementRef.current) return;
    const ctx = canvasElementRef.current.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = toolColor;
    // зависимости width и height нужны, чтобы при ресайзе холста strokeStyle не сбрасывался
  }, [toolColor, width, height]);

  // Круглый курсор для холста
  const {
    updateMousePosition,
    handleMouseEnter,
    handleMouseLeave,
    cursorElement,
  } = useCircleCursor();

  // Инструменты
  const {
    startDrawing,
    draw,
    stopDrawing,
  } = useTool(canvasElementRef.current);

  return (
    <div>
      <div
        className=" relative border border-black bg-white"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          cursor: 'none',
        }}
        onMouseDown={startDrawing}
        onMouseMove={(e) => {
          draw(e);
          updateMousePosition(e);
        }}
        onMouseUp={stopDrawing}
        onMouseLeave={() => {
          stopDrawing();
          handleMouseLeave();
        }}
        onMouseEnter={handleMouseEnter}
      >
        {/* Кастомный курсор */}
        {cursorElement}

        {/* Canvas элементы, служащие для вывода canvas данных из слоев */}
        <LayersCanvasData />

        {/* Canvas элемент с на которым мы непосредственно взаимодействуем */}
        <canvas
          className="absolute top-0 left-0"
          style={{
            width,
            height,
            zIndex: 100 - activeLayerIndex,
          }}
          width={width}
          height={height}
          ref={canvasElementRef}
        />
      </div>

    </div>
  );
};
