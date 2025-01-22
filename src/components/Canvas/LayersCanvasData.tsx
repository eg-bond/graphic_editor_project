import { FC, useCallback, useEffect, useRef } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectLayersList } from '@/redux/history';
import { LayerT } from '@/redux/history/historySlice';

export const LayersCanvasData: FC = () => {
  const { width, height } = useAppSelector(state => state.project);
  const layersList = useAppSelector(selectLayersList);

  // Реф, хранящий ссылки на отрендеренные canvas элементы
  const canvasRefs = useRef<{
    [key: string]: HTMLCanvasElement | null;
  }>({});

  // Функция, отвечающая за загрузку и отрисовку данных из redux в canvas
  const loadCanvasData = useCallback(async (): Promise<void> => {
    for (const index of Object.keys(canvasRefs.current)) {
      const canvas = canvasRefs.current[index];
      const context = canvas?.getContext('2d');
      if (!canvas || !context) continue;

      const savedData = layersList[+index].canvasData;

      // Create a blob from the base64 data
      const blob = await fetch(savedData).then(res => res.blob());
      // Create bitmap (hardware accelerated)
      const bitmap = await createImageBitmap(blob);

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(bitmap, 0, 0);

      // Optional: release the bitmap when done
      bitmap.close();
    }
  }, [layersList]);

  // Обновляем содержимое canvas элементов при обновлении layersList
  useEffect(() => {
    loadCanvasData();
  }, [layersList, loadCanvasData]);

  // Memoize styles for better performance
  const getCanvasStyle = useCallback((layer: LayerT, index: number) => ({
    width: `${width}px`,
    height: `${height}px`,
    zIndex: 100 - index,
    opacity: layer.opacity / 100,
    display: layer.visible ? 'block' : 'none',
  }), [width, height]);

  return (
    <>
      {layersList.map((layer, i) => (
        <canvas
          key={layer.id}
          className="absolute top-0 left-0"
          style={getCanvasStyle(layer, i)}
          width={width}
          height={height}
          ref={el => canvasRefs.current[i] = el}
        />
      ))}
    </>
  );
};
