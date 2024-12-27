import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { activateHistoryItem } from '@/redux/history';
import { ActionIcon } from '../ActionIcon';
import { getHistoryItemName } from '@/utils/getHistoryName';
import { useCallback } from 'react';
import { setStateFromHistory } from '@/redux/layers';

export function HistoryMenu() {
  const historyList = useAppSelector(state => state.history.items);
  const activeItemIndex = useAppSelector(
    state => state.history.activeItemIndex
  );
  const d = useAppDispatch();

  const handleActivateHistoryItem = useCallback(
    (index: number) => {
      if (index === activeItemIndex) return;
      d(activateHistoryItem({ index }));
      d(setStateFromHistory({ layersList: historyList[index].layersList }));
    },
    [d, historyList, activeItemIndex]
  );

  // Tailwind classes for history item
  const staticClasses =
    'flex justify-between p-2 border-b-2 first:border-t-2 border-gray-500 hover: cursor-pointer ';
  const dynamicClasses = (i: number) => {
    const activeCl = activeItemIndex === i ? 'bg-slate-400' : '';
    const futureCl = activeItemIndex < i ? 'text-gray-500' : '';
    return `${activeCl} ${futureCl}`;
  };

  return (
    <div className='h-1/2'>
      <div className='h-full flex flex-col '>
        <h1 className='m-2 text-2xl text-center'>История</h1>
        {/* List of history items */}
        <div className='overflow-y-auto'>
          {historyList.map((item, i) => (
            <div
              key={item.id}
              onClick={() => handleActivateHistoryItem(i)}
              className={`${staticClasses} ${dynamicClasses(i)}`}>
              {/* Action icon of history item */}
              <ActionIcon kind={item.kind} />
              {/* Name of history item */}
              <span className='basis-3/4 flex justify-end'>
                {getHistoryItemName(item.kind)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
