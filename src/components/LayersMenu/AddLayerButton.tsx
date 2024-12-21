import { useAppDispatch } from '@/redux/hooks';
import { addLayer } from '@/redux/layers';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export function AddLayerButton() {
  const d = useAppDispatch();
  return (
    <Button
      className='m-2'
      icon={<PlusOutlined />}
      block
      onClick={() => d(addLayer())}></Button>
  );
}
