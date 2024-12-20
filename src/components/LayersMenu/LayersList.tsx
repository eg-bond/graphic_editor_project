import { LayerT } from '@/redux/layers/layersSlice';
import { Layer } from './Layer';

interface ILayersListProps {
  layers: Array<LayerT>;
}

export function LayersList({ layers }: ILayersListProps) {
  return (
    <div className='layers'>
      <div className='flex flex-col justify-between'>
        {layers.map(layer => (
          <Layer
            key={layer.id}
            id={layer.id}
            name={layer.name}
            active={layer.active}
            visible={layer.visible}
          />
        ))}
      </div>
    </div>
  );
}
