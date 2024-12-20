import { useAppSelector } from '@/redux/hooks';
import { Divider } from 'antd';
import { HistoryList } from './HistoryList';

export function HistoryMenu() {
  const historyList = useAppSelector(state => state.history);

  return (
    <div className='h-1/2'>
      <h1>History Menu</h1>
      <Divider className='m-0' />
      <HistoryList historyList={historyList} />
    </div>
  );
}
