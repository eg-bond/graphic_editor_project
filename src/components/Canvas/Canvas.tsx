import { memo, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { useTool } from '@/hooks/useTool.ts';
import { LayersCanvasData } from './LayersCanvasData';
import { selectActiveLayer, selectActiveLayerIndex } from '@/redux/history';
import { useCircleCursor } from '@/hooks/useCircleCursor';
import { loadCanvasData } from '@/utils/loadCanvasData';

export const Canvas = memo(() => {
  const { width, height } = useAppSelector(state => state.project);
  const activeLayerIndex = useAppSelector(selectActiveLayerIndex);
  const activeLayer = useAppSelector(selectActiveLayer);
  const toolColor = useAppSelector(state => state.tools.color);
  const lineWidth = useAppSelector(state => state.tools.lineWidth);
  // layerCanvas - тот, который отрисовывается из слоев в redux
  const [layerCanvasVisible, setLayerCanvasVisible] = useState(true);

  // Реф для хранения используемого для рисования canvas элемента
  const canvasElementRef = useRef<HTMLCanvasElement | null>(null);

  // Эффект, который загружает в рабочий canvas данные из активного слоя
  useEffect(() => {
    loadCanvasData({
      canvasElement: canvasElementRef.current,
      data: activeLayer?.canvasData,
      width,
      height,
    });
  }, [activeLayerIndex, width, height, canvasElementRef, activeLayer]);

  // Эффект, который устанавливавает lineWidth
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
        onMouseDown={(e) => {
          setLayerCanvasVisible(false);
          startDrawing(e);
        }}
        onMouseMove={(e) => {
          draw(e);
          updateMousePosition(e);
        }}
        onMouseUp={(e) => {
          stopDrawing(e);
          setTimeout(() => setLayerCanvasVisible(true), 100);
        }}
        onMouseLeave={(e) => {
          stopDrawing(e);
          handleMouseLeave();
          setTimeout(() => setLayerCanvasVisible(true), 100);
        }}
        onMouseEnter={handleMouseEnter}
      >
        {/* Кастомный курсор */}
        {cursorElement}

        {/* Canvas элементы, служащие для вывода canvas данных из слоев */}
        <LayersCanvasData layerCanvasVisible={layerCanvasVisible} />

        {/* Canvas элемент с на которым мы непосредственно взаимодействуем */}
        <canvas
          className="absolute top-0 left-0"
          style={{
            width,
            height,
            zIndex: 100 - activeLayerIndex,
            opacity: activeLayer.opacity / 100 || 1,
            display: activeLayer.visible ? 'block' : 'none',
          }}
          width={width}
          height={height}
          ref={canvasElementRef}
        />
      </div>

    </div>
  );
});
