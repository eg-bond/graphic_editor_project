import { useAppDispatch } from '@/redux/hooks';
import { addLayer } from '@/redux/layers';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export function AddLayerButton() {
  const d = useAppDispatch();
  return (
    <div className='m-2'>
      <Button
        icon={<PlusOutlined />}
        block
        onClick={() => d(addLayer())}></Button>
    </div>
  );
}
