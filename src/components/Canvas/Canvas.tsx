import { Button } from 'antd';
import { FC, useEffect, useRef } from 'react';
import { useSaveAndLoad } from '../../hooks/useSaveAndLoad';
import { useBrush } from '../../hooks/useBrush';
import { useAppSelector } from '@/redux/hooks';

export interface ICanvasProps {
  width: number;
  height: number;
}

export const Canvas: FC<ICanvasProps> = ({ width, height }) => {
  const layersList = useAppSelector(
    state => state.history.items?.[state.history.activeItemIndex]?.layersList,
  ) ?? [];
  const activeLayerIndex = useAppSelector(
    state => state.history.items[state.history.activeItemIndex]?.activeLayerIndex,
  );
  const toolColor = useAppSelector(state => state.tools.color);

  // Реф, хранящий ссылки на отрендеренные canvas элементы
  const canvasRefs = useRef<{
    [key: string]: HTMLCanvasElement | null;
  }>({});
  // Реф, хранящий ссылки на 2d контексты этих canvas элементов (нужен ли???)
  const contextRefs = useRef<{
    [key: string]: CanvasRenderingContext2D;
  }>({});

  // эффект, который сохраняет контексты canvas элементов в contextRefs и
  // загружающий данные из redux в canvas элементы при каждом изменении layersList
  // тут точно нужно что-то менять, чтобы был нормальный performance
  useEffect(() => {
    Object.keys(canvasRefs.current).forEach((i) => {
      const canvas = canvasRefs.current[i];
      if (!canvas) return;

      const context = canvas.getContext('2d');
      if (!context) return;

      // lineWidth наверное должен устанавливаться внутри useBrush и т.д.??
      context.lineWidth = 5;
      contextRefs.current[i] = context;
      // функция загрузки данных точно не должна отрабатывать при любом изменении layersList
      loadCanvasData();
    });
  }, [layersList]);

  useEffect(() => {
    Object.keys(contextRefs.current).forEach((i) => {
      contextRefs.current[i].strokeStyle = toolColor;
    });
  }, [toolColor]);

  // хук, отвечающий за сохранение и загрузку данных из canvas элементов в redux и наоборот
  const {
    saveCanvasData,
    loadCanvasData,
    clearCanvas,
  } = useSaveAndLoad(canvasRefs, contextRefs, layersList, activeLayerIndex);

  // контекст конкретного canvas элемента активного слоя,
  const canvasContext = contextRefs.current[activeLayerIndex];

  // хук, реализующий функционал инструмента "Кисть"
  const {
    startDrawing,
    draw,
    stopDrawing,
  } = useBrush(canvasContext, saveCanvasData);

  // Будет необходимо при смене инструментов? Перенести в useBrush?
  // const setToDraw = () => {
  //   if (!contextRefs.current[activeLayerIndex]) return;
  //   contextRefs.current[activeLayerIndex].globalCompositeOperation = 'source-over';
  // };

  // const setToErase = () => {
  //   if (!contextRefs.current[activeLayerIndex]) return;
  //   contextRefs.current[activeLayerIndex].globalCompositeOperation = 'destination-out';
  // };

  return (
    <div>
      <div
        className=" relative border border-black bg-white mx-auto"
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      >
        {layersList.map((layer, i) => (
          <canvas
            key={layer.id}
            className="absolute top-0 left-0"
            style={{
              width: `${width}px`,
              height: `${height}px`,
              zIndex: 100 - i,
              opacity: layer.opacity / 100,
              display: layer.visible ? 'block' : 'none',
            }}
            width={width}
            height={height}
            ref={el => canvasRefs.current[i] = el}
          >
          </canvas>
        ))}

      </div>
      <div>
        {/* Временные кнопки для удобства */}
        {/* <Button onClick={setToDraw}>
          Draw
        </Button> */}
        {/* <Button onClick={setToErase}>
          Erase
        </Button> */}
        <Button onClick={saveCanvasData}>Save</Button>
        <Button onClick={loadCanvasData}>Load</Button>
        <Button onClick={clearCanvas}>Clear</Button>
      </div>

    </div>
  );
};
