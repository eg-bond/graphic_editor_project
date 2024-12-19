import { Layer } from '@/redux/layers/layersSlice';
import { Button, Dropdown, MenuProps } from 'antd';

interface ILayersProps {
  layers: Array<Layer>;
}

export function LayersList({ layers }: ILayersProps) {
  const items: MenuProps['items'] = [
    {
      label: 'Переименовать',
      key: '1',
    },
    {
      label: 'Удалить',
      key: '2',
    },
  ];

  return (
    <div className='layers'>
      <div className='flex flex-col justify-between'>
        {layers.map(layer => (
          <div key={layer.id}>
            <span>{layer.name}</span>
            <button>Скрыть</button>
            <Dropdown
              menu={{ items }}
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
