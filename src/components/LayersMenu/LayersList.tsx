import { useAppSelector } from '@/redux/hooks';
import { Layer } from './Layer';
import { memo } from 'react';

// List of all layers
export const LayersList = memo(function LayersList() {
  const layers = useAppSelector(state => state.history.items?.[state.history.activeItemIndex]?.layersList) ?? [];

  return (
    <div className='flex flex-col justify-between overflow-y-auto'>
      {layers.map((layer, i) => (
        <Layer
          key={layer.id}
          i={i}
          lastElementIndex={layers.length - 1}
          name={layer.name}
          visible={layer.visible}
        />
      ))}
    </div>
  );
});
