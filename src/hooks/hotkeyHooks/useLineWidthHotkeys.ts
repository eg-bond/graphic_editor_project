import {
  lineWidthUp,
  lineWidthDown,
} from '@/redux/tools';
import { useAppDispatch } from '@/redux/hooks';
import { useCallback, useEffect } from 'react';

export const useLineWidthHotkeys = () => {
  const d = useAppDispatch();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey) {
      if (e.key === '+') {
        d(lineWidthUp());
        e.preventDefault();
      }
      if (e.key === '-') {
        d(lineWidthDown());
        e.preventDefault();
      }
    }
  }, [d]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};
