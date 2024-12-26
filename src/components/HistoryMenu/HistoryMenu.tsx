import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { activateHistoryItem } from '@/redux/history';

import { ActionIcon } from '../ActionIcon';
import { getHistoryName } from '@/utils/getHistoryName';
import { useCallback } from 'react';

export function HistoryMenu() {
  const historyList = useAppSelector(state => state.history.items);
  // const layersList = useAppSelector(state => state.layers.list);
  const activeItemIndex = useAppSelector(
    state => state.history.activeItemIndex
  );
  const d = useAppDispatch();

  const handleActivateHistoryItem = useCallback((index: number) => {
    d(activateHistoryItem({ index }));
  }, []);

  const staticClasses =
    'flex justify-between p-3 border-b-2 first:border-t-2 border-gray-500 hover: cursor-pointer';
  const dynamicClasses = (isActive: boolean) =>
    isActive ? 'bg-slate-400' : '';

  return (
    <div className='h-1/2'>
      <div className='h-full flex flex-col'>
        <h1 className='m-2 text-2xl text-center'>История</h1>
        {/* List of history items */}
        <div className='overflow-y-auto'>
          {historyList.map((item, i) => (
            <div
              key={item.id}
              onClick={() => handleActivateHistoryItem(i)}
              className={`${staticClasses} ${dynamicClasses(
                activeItemIndex === i
              )}`}>
              {/* Action icon of history item */}
              <ActionIcon type={item.type} />
              {/* Name of history item */}
              <span className='basis-3/4 flex justify-end'>
                {getHistoryName(item.type)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
