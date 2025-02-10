import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { activateHistoryItem } from '@/redux/history';
import { HistoryItemIcon } from '../HistoryItemIcon';
import { getHistoryItemName } from '@/utils/getHistoryName';
import { useCallback, useMemo } from 'react';
import { useHistoryHotkeys } from '@/hooks/hotkeyHooks/useHistoryHotkeys';

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

  useHistoryHotkeys({ activeItemIndex, historyList, handleActivateHistoryItem });

  // Стили для компоненты
  const staticClasses = useMemo(() => {
    return [
      'relative',
      'flex',
      'justify-between',
      'p-2',
      'border-b-2',
      'border-cBlueHov',
      'first:border-t-2',
      'hover:cursor-pointer',
      'transition-all',
    ].join(' ');
  }, []);

  const dynamicClasses = useCallback((i: number) => {
    const classes = [
      activeItemIndex === i && 'bg-cBlue',
      activeItemIndex < i && 'text-gray-500',
    ];

    return classes.filter(Boolean).join(' ');
  }, [activeItemIndex]);

  return (
    <div className="h-1/2">
      <div className="h-full flex flex-col ">
        <h1 className="m-2 text-2xl text-center">История</h1>
        {/* List of history items */}
        <div className="overflow-y-auto custom-scrollbar">
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
