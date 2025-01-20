import { Button } from 'antd';
import { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { useSaveAndLoad } from '../../hooks/useSaveAndLoad';
import { useBrush } from '../../hooks/useBrush';
import { useAppSelector } from '@/redux/hooks';
import { debounce } from '@/utils/debounce';

export const Canvas: FC = () => {
  // Получаем ширину и высоту из Redux
  const { width, height } = useAppSelector(state => state.project);

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
  // Реф, хранящий ссылки на 2d контексты этих canvas элементов
  const contextRefs = useRef<{
    [key: string]: CanvasRenderingContext2D;
  }>({});

  // мемоизируем отрисовку canvas элементов
  const canvasElements = useMemo(() =>
    layersList.map((layer, i) => (
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
      />
    )),
  [layersList, width, height]);

  // хук, отвечающий за сохранение и загрузку данных из canvas элементов в redux и наоборот
  const {
    saveCanvasData,
    loadCanvasData,
    clearCanvas,
  } = useSaveAndLoad(canvasRefs, contextRefs, layersList, activeLayerIndex);

  // эффект, который сохраняет контексты canvas элементов в contextRefs и
  // загружающий данные из redux в canvas элементы при каждом изменении layersList
  useEffect(() => {
    Object.keys(canvasRefs.current).forEach((i) => {
      const canvas = canvasRefs.current[i];
      if (!canvas) return;

      const context = canvas.getContext('2d');
      if (!context) return;

      // lineWidth наверное должен устанавливаться внутри useBrush??
      context.lineWidth = 5;
      context.strokeStyle = toolColor;
      contextRefs.current[i] = context;
    });
  }, [layersList]);

  // Debounce the load canvas data function
  const debouncedLoadCanvasData = useMemo(
    () => debounce(() => loadCanvasData(), 100),
    [loadCanvasData],
  );
  // Effect for loading canvas data
  useEffect(() => {
    if (layersList.length > 0) {
      debouncedLoadCanvasData();
    }
    return () => debouncedLoadCanvasData.cancel();
  }, [layersList]);

  // эффект, меняющий цвет кисти для всех canvas элементов при изменении toolColor
  useEffect(() => {
    Object.keys(contextRefs.current).forEach((i) => {
      contextRefs.current[i].strokeStyle = toolColor;
    });
  }, [toolColor]);

  // контекст конкретного canvas элемента активного слоя
  const getActiveContext = useCallback(() => {
    return contextRefs.current[activeLayerIndex];
  }, [activeLayerIndex]);

  // хук, реализующий функционал инструмента "Кисть"
  const {
    startDrawing,
    draw,
    stopDrawing,
  } = useBrush(getActiveContext(), saveCanvasData);

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
        {canvasElements}
      </div>
      <div>
        {/* временные кнопки для удобства */}
        <Button onClick={saveCanvasData}>Save</Button>
        <Button onClick={loadCanvasData}>Load</Button>
        <Button onClick={clearCanvas}>Clear</Button>
      </div>
    </div>
  );
};
