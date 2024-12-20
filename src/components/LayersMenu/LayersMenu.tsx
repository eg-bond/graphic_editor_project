import { useAppSelector } from '@/redux/hooks';
import { LayersList } from './LayersList';
import { OpacitySlider } from './OpacitySlider';
import { AddLayerButton } from './AddLayerButton';

export function LayersMenu() {
  const layersList = useAppSelector(state => state.layers.list);

  return (
    <div className='h-1/2'>
      <div className='h-full flex flex-col'>
        <h1 className='m-2 text-2xl text-center'>Слои</h1>

        <AddLayerButton />

        <OpacitySlider />

        <LayersList layers={layersList} />
      </div>
    </div>
  );
}
