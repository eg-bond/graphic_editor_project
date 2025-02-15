import { HistoryItemT } from '@/redux/history/historySlice';
import { useCallback, useEffect } from 'react';

interface IUseHistoryHotkeys {
  activeItemIndex: number;
  historyList: HistoryItemT[];
  handleActivateHistoryItem: (index: number) => void;
}

export const useHistoryHotkeys = ({
  activeItemIndex,
  historyList,
  handleActivateHistoryItem,
}: IUseHistoryHotkeys) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!e.ctrlKey) return;

    if (e.key.toLowerCase() === 'z' || e.key.toLowerCase() === 'я') {
      e.preventDefault();

      if (e.shiftKey) {
        if (activeItemIndex < historyList.length - 1) {
          handleActivateHistoryItem(activeItemIndex + 1);
        }
      } else {
        if (activeItemIndex > 0) {
          handleActivateHistoryItem(activeItemIndex - 1);
        }
      }
    }
  }, [activeItemIndex, historyList.length, handleActivateHistoryItem]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};
