import { useAppSelector } from '@/redux/hooks';
import { Layer } from './Layer';
import { memo } from 'react';

// List of all layers
export const LayersList = memo(function LayersList() {
  const layersList = useAppSelector(state => state.layers.list);

  return (
    <div className='flex flex-col justify-between overflow-y-auto'>
      {layersList.map((layer, i) => (
        <Layer
          key={layer.id}
          i={i}
          id={layer.id}
          name={layer.name}
          visible={layer.visible}
        />
      ))}
    </div>
  );
});
