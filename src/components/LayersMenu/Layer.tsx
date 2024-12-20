import { useAppDispatch } from '@/redux/hooks';
import { removeLayer } from '@/redux/layers';
import { Button, Dropdown, MenuProps } from 'antd';
import type { LayerT } from '@/redux/layers/layersSlice';

interface ILayerProps {
  id: LayerT['id'];
  name: LayerT['name'];
}

export function Layer({ id, name }: ILayerProps) {
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
    <div key={id}>
      <span>{name}</span>
      <button>Скрыть</button>
      <Dropdown menu={{ items }} placement='bottomRight' trigger={['click']}>
        <Button>...</Button>
      </Dropdown>
    </div>
  );
}
