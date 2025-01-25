import { memo } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { Layer } from './Layer';

export const LayersList = memo(function LayersList() {
  const layers = useAppSelector(
    state => state.history.items?.[state.history.activeItemIndex]?.layersList ?? [],
  );

  const activeLayerIndex = useAppSelector(
    state => state.history.items[state.history.activeItemIndex]?.activeLayerIndex,
  );

  return (
    <div className="flex flex-col justify-between overflow-y-auto">
      {layers.map((layer, i) => (
        <Layer
          key={layer.id}
          i={i}
          lastElementIndex={layers.length - 1}
          name={layer.name}
          visible={layer.visible}
          isActive={i === activeLayerIndex}
        />
      ))}
    </div>
  );
});
