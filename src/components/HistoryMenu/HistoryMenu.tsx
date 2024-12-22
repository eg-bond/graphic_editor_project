import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { activateHistoryItem } from '@/redux/history';

export function HistoryMenu() {
  const historyList = useAppSelector(state => state.history);
  const d = useAppDispatch();

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
          {historyList.map(item => (
            <div
              key={item.id}
              onClick={() => d(activateHistoryItem(item.id))}
              className={`${staticClasses} ${dynamicClasses(item.active)}`}>
              <span className='basis-1/4'>{item.type}</span>
              <span className='basis-3/4 flex justify-end'>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
