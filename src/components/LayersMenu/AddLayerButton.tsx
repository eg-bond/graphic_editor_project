import { useAppDispatch } from '@/redux/hooks';
import { addLayer } from '@/redux/layers';
import { Button } from 'antd';

export function AddLayerButton() {
  const d = useAppDispatch();
  return (
    <Button className='m-2' onClick={() => d(addLayer())}>
      Add layer
    </Button>
  );
}
