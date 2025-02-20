import { memo } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { Layer } from './Layer';
import { selectLayersList } from '@/redux/history/selectors';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const LayersList = memo(function LayersList() {
  const layers = useAppSelector(selectLayersList);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col justify-between overflow-y-auto custom-scrollbar">
        {layers.map((layer, i) => (
          <Layer
            key={layer.id}
            index={i}
            name={layer.name}
            visible={layer.visible}
            oneLayerLeft={layers.length === 1}
          />
        ))}
      </div>
    </DndProvider>
  );
});
