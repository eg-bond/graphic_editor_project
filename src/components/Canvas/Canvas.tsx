import { CSSProperties, memo, useCallback, useEffect, useRef } from 'react';
import { useAppSelector } from '@/redux/hooks';
import {
  selectActiveLayerIndex,
  selectLayersList,
  selectWidthAndHeight,
} from '@/redux/history';
import { useCircleCursor } from '@/hooks/useCircleCursor';
import { loadCanvasData } from '@/utils/loadCanvasData';
import { LayerT } from '@/redux/history/historySlice';
import { useTool } from '@/hooks/toolsHooks/useTool';

export const Canvas = memo(() => {
  const { width, height } = useAppSelector(selectWidthAndHeight);
  const activeLayerIndex = useAppSelector(selectActiveLayerIndex);
  const layersList = useAppSelector(selectLayersList);

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
      return {
        width: `${width}px`,
        height: `${height}px`,
        zIndex: 100 - index,
        opacity: layer.opacity / 100 || 1,
        display: !layer.visible ? 'none' : 'block',
        imageRendering: 'pixelated' as CSSProperties['imageRendering'],
      };
    }, [width, height]);

  const {
    updateMousePosition,
    handleMouseEnter,
    handleMouseLeave,
    cursorElement,
  } = useCircleCursor();

  const {
    startDrawing,
    draw,
    stopDrawing,
  } = useTool(canvasRefs.current[activeLayerIndex]);

  useEffect(() => {
    Object.values(canvasRefs.current ?? {}).forEach((c) => {
      const ctx = c?.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = false;
        ctx.filter = 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxmaWx0ZXIgaWQ9ImZpbHRlciIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj48ZmVDb21wb25lbnRUcmFuc2Zlcj48ZmVGdW5jUiB0eXBlPSJpZGVudGl0eSIvPjxmZUZ1bmNHIHR5cGU9ImlkZW50aXR5Ii8+PGZlRnVuY0IgdHlwZT0iaWRlbnRpdHkiLz48ZmVGdW5jQSB0eXBlPSJkaXNjcmV0ZSIgdGFibGVWYWx1ZXM9IjAgMSIvPjwvZmVDb21wb25lbnRUcmFuc2Zlcj48L2ZpbHRlcj48L3N2Zz4=#filter)';
      }
    });
  }, [activeLayerIndex]);

  return (
    <div>
      <div
        className="relative border border-black bg-white"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          cursor: 'none',
          overflow: 'hidden',
        }}
        onMouseDown={e => startDrawing(e)}
        onMouseMove={(e) => {
          draw(e);
          updateMousePosition(e);
        }}
        onMouseUp={e => stopDrawing(e)}
        onMouseLeave={(e) => {
          stopDrawing(e);
          handleMouseLeave();
        }}
        onMouseEnter={handleMouseEnter}
      >
        {cursorElement}
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
      </div>
    </div>
  );
});
