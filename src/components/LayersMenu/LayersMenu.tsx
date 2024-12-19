import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Button, Divider, Slider } from 'antd';
import { LayersList } from './LayersList';
import { addLayer } from '@/redux/layers';

export function LayersMenu() {
  const layers = useAppSelector(state => state.layers);
  const d = useAppDispatch();

  return (
    <div className='h-1/2 border-b border-gray-300 '>
      <h1>Layers Menu</h1>
      <Divider className='m-0' />

      <Button onClick={() => d(addLayer())}>Add layer</Button>

      <h2>Прозрачность</h2>
      <Divider className='m-0' />
      <Slider />

      <LayersList layers={layers} />
    </div>
  );
}
