import { useAppDispatch } from '@/redux/hooks';
import { removeLayer } from '@/redux/layers';
import { Layer } from '@/redux/layers/layersSlice';
import { Button, Dropdown } from 'antd';

interface ILayersProps {
  layers: Array<Layer>;
}

export function LayersList({ layers }: ILayersProps) {
  const d = useAppDispatch();

  const dropdownContent = (layerId: number) => {
    return (
      <div className='bg-white rounded shadow-lg p-2 min-w-[200px]'>
        <button className='w-full text-left px-3 py-2 hover:bg-gray-100 rounded'>
          Переименовать
        </button>
        <button
          className='w-full text-left px-3 py-2 hover:bg-gray-100 rounded'
          onClick={() => d(removeLayer(layerId))}>
          Удалить
        </button>
      </div>
    );
  };

  return (
    <div className='layers'>
      <div className='flex flex-col justify-between'>
        {layers.map(layer => (
          <div key={layer.id}>
            <span>{layer.name}</span>
            <button>Скрыть</button>
            <Dropdown
              dropdownRender={() => dropdownContent(layer.id)}
              placement='bottomLeft'
              trigger={['click']}>
              <Button>...</Button>
            </Dropdown>
          </div>
        ))}
      </div>
    </div>
  );
}
