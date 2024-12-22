import { useAppSelector } from '@/redux/hooks';
import { Layer } from './Layer';

// List of all layers
export function LayersList() {
  const layersList = useAppSelector(state => state.layers.list);

  return (
    <div className='flex flex-col justify-between overflow-y-auto'>
      {layersList.map(layer => (
        <Layer
          key={layer.id}
          id={layer.id}
          name={layer.name}
          active={layer.active}
          visible={layer.visible}
        />
      ))}
    </div>
  );
}
