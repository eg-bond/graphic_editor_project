import { addDrawing } from '@/redux/history';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { combineCanvasImages } from '@/utils/combineCanvasImages';

export const useSaveCanvasData = (
  canvasElement: HTMLCanvasElement | null,
) => {
  const d = useAppDispatch();
  const layersList = useAppSelector(
    state => state.history.items?.[state.history.activeItemIndex]?.layersList,
  ) ?? [];
  const activeLayerIndex = useAppSelector(
    state => state.history.items[state.history.activeItemIndex]?.activeLayerIndex,
  );

  const saveCanvasData = (): void => {
    if (!canvasElement) return;
    const ctx = canvasElement.getContext('2d');

    if (!ctx) return;

    const oldCanvasData = layersList[activeLayerIndex].canvasData;
    const newCanvasData = canvasElement.toDataURL('image/png');

    combineCanvasImages(oldCanvasData, newCanvasData)
      .then(canvasData => d(addDrawing({ canvasData })))
      .finally(() => ctx.clearRect(0, 0, 10000, 10000));
  };

  return { saveCanvasData };
};
