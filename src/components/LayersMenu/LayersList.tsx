import { memo } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { Layer } from './Layer';
import { selectActiveLayerIndex, selectLayersList } from '@/redux/history/selectors';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const LayersList = memo(function LayersList() {
  const layers = useAppSelector(selectLayersList);
  const activeLayerIndex = useAppSelector(selectActiveLayerIndex);

  return (
    <DndProvider backend={HTML5Backend}>
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
    </DndProvider>
  );
});
