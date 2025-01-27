import { memo, useCallback, useEffect, useRef } from 'react';
import { useAppSelector } from '@/redux/hooks';
import {
  selectActiveLayerIndex,
  selectLayersList,
} from '@/redux/history';
import { LayerT } from '@/redux/history/historySlice';
import { loadCanvasData } from '@/utils/loadCanvasData';

interface ILayersCanvasData {
  layerCanvasVisible: boolean;
}

export const LayersCanvasData = memo<ILayersCanvasData>(({ layerCanvasVisible }) => {
  const { width, height } = useAppSelector(state => state.project);
  const layersList = useAppSelector(selectLayersList);
  const activeLayerIndex = useAppSelector(selectActiveLayerIndex);

  // Реф, хранящий ссылки на отрендеренные canvas элементы
  const canvasRefs = useRef<{
    [key: string]: HTMLCanvasElement | null;
  }>({});

  // Обновляем содержимое canvas элементов при обновлении layersList
  useEffect(() => {
    for (const index of Object.keys(canvasRefs.current)) {
      const canvasElement = canvasRefs.current[index];
      loadCanvasData({
        canvasElement,
        data: layersList[+index]?.canvasData,
        width,
        height,
      });
    }
  }, [layersList, height, width]);

  // Memoize styles for better performance
  const getCanvasStyle = useCallback(
    (layer: LayerT, index: number) => {
      const display = !layer.visible
        ? 'none'
        : layerCanvasVisible
          ? 'block'
          : activeLayerIndex === index
            ? 'none'
            : 'block';

      return {
        width: `${width}px`,
        height: `${height}px`,
        zIndex: 100 - index,
        opacity: layer.opacity / 100 || 1,
        display,
      };
    }, [width, height, activeLayerIndex, layerCanvasVisible]);

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
});
