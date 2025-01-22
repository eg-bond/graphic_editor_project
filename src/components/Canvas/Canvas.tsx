import { FC, useEffect, useRef } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { useTool } from '@/hooks/useTool.ts';
import { LayersCanvasData } from './LayersCanvasData';
import { selectActiveLayerIndex } from '@/redux/history';

export const Canvas: FC = () => {
  // Получаем ширину и высоту из Redux
  const { width, height } = useAppSelector(state => state.project);
  const activeLayerIndex = useAppSelector(selectActiveLayerIndex);
  const toolColor = useAppSelector(state => state.tools.color);

  // Реф для хранения используемого для рисования canvas элемента
  const canvasElementRef = useRef<HTMLCanvasElement | null>(null);

  // Эффект, который устанавливавает lineWidth (в будущем должен изменяться
  // в зависимости от толщины инструмента, установленной в toolsSlice)
  useEffect(() => {
    if (!canvasElementRef.current) return;
    const ctx = canvasElementRef.current.getContext('2d');
    if (!ctx) return;
    ctx.lineWidth = 5;
  }, []);

  // эффект, меняющий цвет кисти canvas элемента при изменении toolColor
  useEffect(() => {
    if (!canvasElementRef.current) return;
    const ctx = canvasElementRef.current.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = toolColor;
  }, [toolColor]);

  // хук, реализующий функционал инструмента "Кисть"
  const {
    startDrawing,
    draw,
    stopDrawing,
  } = useTool(canvasElementRef.current);

  return (
    <div className="mt-20">
      <div
        className=" relative border border-black bg-white mx-auto"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          margin: '1rem',

        }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      >
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
