import {
  layerUp,
  layerDown,
  changeLayerVisibility,
} from '@/redux/history';
import { useAppDispatch } from '@/redux/hooks';
import { useCallback, useEffect } from 'react';

export const useLayersHotkeys = () => {
  const d = useAppDispatch();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!e.altKey) return;

    if (e.key === 'ArrowUp') {
      d(layerUp());
      e.preventDefault();
    }
    if (e.key === 'ArrowDown') {
      d(layerDown());
      e.preventDefault();
    }

    if (e.key.toLowerCase() === 'h' || e.key.toLowerCase() === 'р') {
      d(changeLayerVisibility({}));
      e.preventDefault();
    }
  }, [d]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};
