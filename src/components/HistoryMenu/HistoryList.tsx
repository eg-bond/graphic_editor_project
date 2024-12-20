import { HistoryT } from '@/redux/history/historySlice';

interface IHistoryListProps {
  historyList: Array<HistoryT>;
}

export function HistoryList({ historyList }: IHistoryListProps) {
  return (
    <div className='overflow-y-auto'>
      {historyList.map(item => (
        <div
          key={item.id}
          className='flex justify-around p-3 border-b-2 first:border-t-2 border-gray-500'>
          <span className='basis-1/4'>{item.type}</span>
          <span className='basis-3/4 flex justify-center'>{item.name}</span>
        </div>
      ))}
    </div>
  );
}
