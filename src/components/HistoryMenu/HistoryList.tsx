import { HistoryT } from '@/redux/history/historySlice';

interface IHistoryListProps {
  historyList: Array<HistoryT>;
}

export function HistoryList({ historyList }: IHistoryListProps) {
  return (
    <div className='history'>
      <div className='flex flex-col justify-between'>
        {historyList.map(item => (
          <div key={item.id}>
            <span>{item.type}</span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
