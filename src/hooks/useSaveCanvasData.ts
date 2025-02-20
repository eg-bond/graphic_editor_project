import {
  addDrawing,
} from '@/redux/history';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { getHistoryItemKindFromTool } from '@/utils/getHistoryItemKindFromTool';
import { useCallback } from 'react';

export const useSaveCanvasData = (
  canvasElement: HTMLCanvasElement | null,
) => {
  const d = useAppDispatch();
  const tool = useAppSelector(state => state.tools.tool);

  const saveCanvasData = useCallback((): void => {
    if (!canvasElement) return;
    const ctx = canvasElement.getContext('2d');
    if (!ctx) return;
    const canvasData = canvasElement.toDataURL('image/png');

    d(addDrawing({ canvasData, kind: getHistoryItemKindFromTool(tool) }));
  }, [tool, canvasElement, d]);

  return { saveCanvasData };
};
