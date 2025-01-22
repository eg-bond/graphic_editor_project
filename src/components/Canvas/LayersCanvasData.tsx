import { FC, useEffect, useMemo, useRef } from 'react';
import { useSaveAndLoad } from '@/hooks/useSaveAndLoad.ts';
import { useAppSelector } from '@/redux/hooks';
import { debounce } from '@/utils/debounce';
import { selectLayersList } from '@/redux/history';

export const LayersCanvasData: FC = () => {
  // Получаем ширину и высоту из Redux
  const { width, height } = useAppSelector(state => state.project);
  const layersList = useAppSelector(selectLayersList);
  const toolColor = useAppSelector(state => state.tools.color);

  // Реф, хранящий ссылки на отрендеренные canvas элементы
  const canvasRefs = useRef<{
    [key: string]: HTMLCanvasElement | null;
  }>({});

  // Реф, хранящий ссылки на 2d контексты этих canvas элементов
  const contextRefs = useRef<{
    [key: string]: CanvasRenderingContext2D;
  }>({});

  // хук, отвечающий за загрузку данных из redux в canvas
  const { loadCanvasData } = useSaveAndLoad(canvasRefs, contextRefs, layersList);

  // эффект, который сохраняет контексты canvas элементов в contextRefs и
  // загружающий данные из redux в canvas элементы при каждом изменении layersList
  useEffect(() => {
    Object.keys(canvasRefs.current).forEach((i) => {
      const canvas = canvasRefs.current[i];
      if (!canvas) return;

      const context = canvas.getContext('2d');
      if (!context) return;

      contextRefs.current[i] = context;
    });
  }, [layersList, toolColor]);

  // Debounce the load canvas data function
  const debouncedLoadCanvasData = useMemo(
    () => debounce(() => loadCanvasData(), 0), // убрать deb????
    [loadCanvasData],
  );
  // Effect for loading canvas data
  useEffect(() => {
    if (layersList.length > 0) {
      debouncedLoadCanvasData();
    }
    return () => debouncedLoadCanvasData.cancel();
  }, [layersList]);

  return (
    <>
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
        />
      ))}
    </>
  );
};
