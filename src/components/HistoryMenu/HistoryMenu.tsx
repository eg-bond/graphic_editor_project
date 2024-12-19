import { Divider } from 'antd';

export function HistoryMenu() {
  return (
    <div className='h-1/2'>
      <h1>History Menu</h1>
      <Divider className='m-0' />
      <div className='history'>
        <div className='flex flex-col justify-between'>
          <div>Действие 1</div>
          <div>Действие 2</div>
          <div>Действие 3</div>
        </div>
      </div>
    </div>
  );
}
