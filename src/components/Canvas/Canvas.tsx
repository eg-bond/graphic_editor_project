import { FC, useCallback, useEffect, useRef } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { useTool } from '@/hooks/useTool.ts';
import { LayersCanvasData } from './LayersCanvasData';
import { selectActiveLayer, selectActiveLayerIndex } from '@/redux/history';
import { useCircleCursor } from '@/hooks/useCircleCursor';

export const Canvas: FC = () => {
  const { width, height } = useAppSelector(state => state.project);
  const activeLayerIndex = useAppSelector(selectActiveLayerIndex);
  const activeLayer = useAppSelector(selectActiveLayer);
  const toolColor = useAppSelector(state => state.tools.color);
  const lineWidth = useAppSelector(state => state.tools.lineWidth);

  // Реф для хранения используемого для рисования canvas элемента
  const canvasElementRef = useRef<HTMLCanvasElement | null>(null);

  // Функция, отвечающая за загрузку и отрисовку данных из redux в canvas
  const loadCanvasData = useCallback(async (): Promise<void> => {
    const ctx = canvasElementRef.current?.getContext('2d');
    if (!ctx) return;

    const savedData = activeLayer.canvasData;

    // Create a blob from the base64 data
    const blob = await fetch(savedData).then(res => res.blob());
    // Create bitmap (hardware accelerated)
    const bitmap = await createImageBitmap(blob);

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(bitmap, 0, 0);

    // Optional: release the bitmap when done
    bitmap.close();
  }, [activeLayer, width, height]);

  // Эффект, который загружает в рабочий canvas данные из активного слоя
  useEffect(() => {
    if (!canvasElementRef.current) return;
    const ctx = canvasElementRef.current.getContext('2d');
    if (!ctx) return;

    loadCanvasData();
    // зависимости width и height нужны, чтобы при ресайзе холста lineWidth не сбрасывался
  }, [activeLayerIndex, loadCanvasData]);

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
        onMouseDown={startDrawing}
        onMouseMove={(e) => {
          draw(e);
          updateMousePosition(e);
        }}
        onMouseUp={stopDrawing}
        onMouseLeave={(e) => {
          stopDrawing(e);
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
            opacity: activeLayer.opacity / 100,
            display: activeLayer.visible ? 'block' : 'none',
          }}
          width={width}
          height={height}
          ref={canvasElementRef}
        />
      </div>

    </div>
  );
};
