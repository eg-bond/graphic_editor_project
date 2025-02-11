import { useAppDispatch } from '@/redux/hooks';
import { selectTool, ToolKinds } from '@/redux/tools';
import { useCallback, useEffect, useMemo } from 'react';

export const useToolsHotkeys = () => {
  const d = useAppDispatch();

  const toolShortcuts = useMemo(() => new Map<string, ToolKinds>([
    ['b', ToolKinds.Brush],
    ['e', ToolKinds.Eraser],
    ['l', ToolKinds.Line],
    ['c', ToolKinds.Circle],
    ['r', ToolKinds.Rect],
    ['t', ToolKinds.Triangle],
    ['m', ToolKinds.Move],
  ]), []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!e.altKey) return;

    const tool = toolShortcuts.get(e.key.toLocaleLowerCase());
    if (tool) {
      e.preventDefault();
      d(selectTool({ tool }));
    }
  }, [d, toolShortcuts]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};
