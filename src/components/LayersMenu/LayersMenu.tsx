import { useAppSelector } from '@/redux/hooks';
import { Divider } from 'antd';
import { LayersList } from './LayersList';
import { OpacitySlider } from './OpacitySlider';
import { AddLayerButton } from './AddLayerButton';

export function LayersMenu() {
  const layers = useAppSelector(state => state.layers);

  return (
    <div className='h-1/2 border-b border-gray-300 '>
      <h1>Layers Menu</h1>
      <Divider className='m-0' />

      <AddLayerButton />

      <OpacitySlider />

      <LayersList layers={layers} />
    </div>
  );
}
