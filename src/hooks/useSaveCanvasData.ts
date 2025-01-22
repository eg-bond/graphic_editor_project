import {
  addDrawing,
  selectActiveLayerIndex,
  selectLayersList,
} from '@/redux/history';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { combineCanvasImages } from '@/utils/combineCanvasImages';
import { getHistoryItemKind } from '@/utils/getHistoryItemKind';

export const useSaveCanvasData = (
  canvasElement: HTMLCanvasElement | null,
) => {
  const d = useAppDispatch();
  const layersList = useAppSelector(selectLayersList);
  const activeLayerIndex = useAppSelector(selectActiveLayerIndex);
  const tool = useAppSelector(state => state.tools.tool);

  const saveCanvasData = (): void => {
    if (!canvasElement) return;
    const ctx = canvasElement.getContext('2d');

    if (!ctx) return;

    const layerCanvasData = layersList[activeLayerIndex].canvasData;
    const newCanvasData = canvasElement.toDataURL('image/png');

    combineCanvasImages(layerCanvasData, newCanvasData)
      .then(canvasData => d(addDrawing(
        { canvasData, kind: getHistoryItemKind(tool) },
      )))
      // Очищаем canvasElement после сохранения
      // таймаут используется, чтобы не было видно эффекта "моргания", когда
      // canvasElement уже очищен, а в LayersCanvasData нужный
      // элемент еще не успел отрендериться.
      .finally(() => setTimeout(() => ctx.clearRect(0, 0, 10000, 10000), 300));
  };

  return { saveCanvasData };
};
