import {
  lineWidthUp,
  lineWidthDown,
} from '@/redux/tools';
import { useAppDispatch } from '@/redux/hooks';
import { useCallback, useEffect } from 'react';

export const useLineWidthHotkeys = () => {
  const d = useAppDispatch();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.altKey) {
      if (e.key === '+' || e.key === '=') {
        d(lineWidthUp());
        e.preventDefault();
      }
      if (e.key === '-') {
        d(lineWidthDown());
        e.preventDefault();
      }
    }
  }, [d]);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (e.altKey) {
      e.preventDefault();
      e.stopPropagation();
      if (e.deltaY > 0) {
        d(lineWidthDown());
      } else {
        d(lineWidthUp());
      }
    }
  }, [d]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);
};
