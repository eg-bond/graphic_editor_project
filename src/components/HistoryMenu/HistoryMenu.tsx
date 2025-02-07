import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { activateHistoryItem } from '@/redux/history';
import { HistoryItemIcon } from '../HistoryItemIcon';
import { getHistoryItemName } from '@/utils/getHistoryName';
import { useCallback, useEffect } from 'react';

export function HistoryMenu() {
  const d = useAppDispatch();
  const historyList = useAppSelector(state => state.history.items);
  const activeItemIndex = useAppSelector(state => state.history.activeItemIndex);

  const handleActivateHistoryItem = useCallback(
    (index: number) => {
      if (index === activeItemIndex) return;
      d(activateHistoryItem({ index }));
    },
    [d, activeItemIndex],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'z') {
        if (activeItemIndex > 0) {
          handleActivateHistoryItem(activeItemIndex - 1);
        }
        e.preventDefault();
      } else if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'z') {
        if (activeItemIndex < historyList.length - 1) {
          handleActivateHistoryItem(activeItemIndex + 1);
        }
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeItemIndex, historyList, handleActivateHistoryItem]);

  const staticClasses =
    'flex justify-between p-2 border-b-2 border-gray-500 ' +
    'first:border-t-2 hover: cursor-pointer ';
  const dynamicClasses = (i: number) => {
    const activeCl = activeItemIndex === i ? 'bg-slate-400' : '';
    const futureCl = activeItemIndex < i ? 'text-gray-500' : '';
    return `${activeCl} ${futureCl}`;
  };

  return (
    <div className="h-1/2">
      <div className="h-full flex flex-col ">
        <h1 className="m-2 text-2xl text-center">История</h1>
        {/* List of history items */}
        <div className="overflow-y-auto">
          {historyList.map((item, i) => (
            <div
              key={item.id}
              onClick={() => handleActivateHistoryItem(i)}
              className={`${staticClasses} ${dynamicClasses(i)}`}
            >
              {/* Icon of history item */}
              <HistoryItemIcon kind={item.kind} />
              {/* Name of history item */}
              <span className="basis-3/4 flex justify-end">
                {getHistoryItemName(item.kind)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
