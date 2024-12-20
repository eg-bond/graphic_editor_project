import { activateHistoryItem } from '@/redux/history';
import { HistoryT } from '@/redux/history/historySlice';
import { useAppDispatch } from '@/redux/hooks';

interface IHistoryListProps {
  historyList: Array<HistoryT>;
}

export function HistoryList({ historyList }: IHistoryListProps) {
  const d = useAppDispatch();
  return (
    <div className='overflow-y-auto'>
      {historyList.map(item => (
        <div
          key={item.id}
          onClick={() => d(activateHistoryItem(item.id))}
          className={`flex justify-around p-3 border-b-2 first:border-t-2
            border-gray-500 hover:bg-slate-400 cursor-pointer
           ${item.active ? 'bg-slate-400' : ''}`}>
          <span className='basis-1/4'>{item.type}</span>
          <span className='basis-3/4 flex justify-center'>{item.name}</span>
        </div>
      ))}
    </div>
  );
}
