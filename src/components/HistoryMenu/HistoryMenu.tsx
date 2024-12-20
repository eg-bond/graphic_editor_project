import { useAppSelector } from '@/redux/hooks';
import { HistoryList } from './HistoryList';

export function HistoryMenu() {
  const historyList = useAppSelector(state => state.history);

  return (
    <div className='h-1/2'>
      <div className='h-full rounded-lg border-2 flex flex-col'>
        <h1 className='m-3 text-2xl text-center'>История</h1>
        <HistoryList historyList={historyList} />
      </div>
    </div>
  );
}
