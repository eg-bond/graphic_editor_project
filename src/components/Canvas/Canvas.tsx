import { memo, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useTool } from '@/hooks/useTool.ts';
import { LayersCanvasData } from './LayersCanvasData';
import { selectActiveHistoryItem, selectActiveLayer, selectActiveLayerIndex } from '@/redux/history';
import { useCircleCursor } from '@/hooks/useCircleCursor';
import { loadCanvasData } from '@/utils/loadCanvasData';
import { updateResolution } from '@/redux/project/projectSlice';

export const Canvas = memo(() => {
  const dispatch = useAppDispatch();

  const { width, height } = useAppSelector(state => state.project);
  const activeLayerIndex = useAppSelector(selectActiveLayerIndex);
  const activeLayer = useAppSelector(selectActiveLayer);
  const toolColor = useAppSelector(state => state.tools.color);
  const lineWidth = useAppSelector(state => state.tools.lineWidth);
  const activeHistoryItem = useAppSelector(selectActiveHistoryItem);

  const [layerCanvasVisible, setLayerCanvasVisible] = useState(true);
  const canvasElementRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasElementRef.current && activeLayer) {
      loadCanvasData({
        canvasElement: canvasElementRef.current,
        data: activeLayer.canvasData,
        width,
        height,
      });
    }
  }, [activeLayer, width, height]);

  useEffect(() => {
    const { width, height } = activeHistoryItem ?? {};

    if (width && height) {
      dispatch(updateResolution({ width, height }));
    } else {
      console.warn(' История без размеров:', activeHistoryItem);
    }
  }, [activeHistoryItem, dispatch]);

  useEffect(() => {
    if (!canvasElementRef.current) return;
    const ctx = canvasElementRef.current.getContext('2d');
    if (!ctx) return;
    ctx.lineWidth = lineWidth;
  }, [lineWidth, width, height]);

  useEffect(() => {
    if (!canvasElementRef.current) return;
    const ctx = canvasElementRef.current.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = toolColor;
  }, [toolColor, width, height]);

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
  } = useTool(canvasElementRef.current);

  return (
    <div>
      <div
        className="relative border border-black bg-white"
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
        {cursorElement}
        <LayersCanvasData layerCanvasVisible={layerCanvasVisible} />
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
