import { useAppDispatch } from '@/redux/hooks';
import { activateLayer, removeLayer } from '@/redux/layers';
import { Button, Dropdown, MenuProps } from 'antd';
import type { LayerT } from '@/redux/layers/layersSlice';

interface ILayerProps {
  id: LayerT['id'];
  name: LayerT['name'];
  active: LayerT['active'];
}

export function Layer({ id, name, active }: ILayerProps) {
  const d = useAppDispatch();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Переименовать',
    },
    {
      key: '2',
      label: 'Удалить',
      danger: true,
      onClick: () => d(removeLayer(id)),
    },
  ];

  return (
    <div className='flex justify-between items-center gap-2'>
      <Button className='flex-grow' onClick={() => d(activateLayer(id))}>
        {name}
      </Button>
      {active && <span>Active</span>}
      <div className='flex gap-2'>
        <Button>Скрыть</Button>
        <Dropdown menu={{ items }} placement='bottomRight' trigger={['click']}>
          <Button>...</Button>
        </Dropdown>
      </div>
    </div>
  );
}
