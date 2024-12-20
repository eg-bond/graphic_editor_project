import { useAppDispatch } from '@/redux/hooks';
import { addLayer } from '@/redux/layers';
import { Button } from 'antd';

export function AddLayerButton() {
  const d = useAppDispatch();
  return <Button onClick={() => d(addLayer())}>Add layer</Button>;
}
