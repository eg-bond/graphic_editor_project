import { useAppSelector } from '@/redux/hooks';
import { Divider, Slider } from 'antd';
import { LayersList } from './LayersList';

export function LayersMenu() {
  const layers = useAppSelector(state => state.layers);
  return (
    <div className='h-1/2 border-b border-gray-300 '>
      <h1>Layers Menu</h1>
      <Divider className='m-0' />
      <button>Add layer</button>
      <h2>Прозрачность</h2>
      <Divider className='m-0' />
      <Slider />
      <LayersList layers={layers} />
    </div>
  );
}
