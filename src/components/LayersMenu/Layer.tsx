import { useAppDispatch } from '@/redux/hooks';
import { changeLayerVisibility, removeLayer } from '@/redux/layers';
import { Button, Dropdown, MenuProps } from 'antd';
import type { LayerT } from '@/redux/layers/layersSlice';
import { useState } from 'react';
import LayerName from './LayerName';

interface ILayerProps {
  id: LayerT['id'];
  name: LayerT['name'];
  active: LayerT['active'];
  visible: LayerT['visible'];
}

export function Layer({ id, name, active, visible }: ILayerProps) {
  const d = useAppDispatch();

  const [isInputVisible, setIsInputVisible] = useState(false);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Переименовать',
      onClick: () => setIsInputVisible(true),
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
      <LayerName
        id={id}
        name={name}
        isInputVisible={isInputVisible}
        setIsInputVisible={setIsInputVisible}
      />

      {active && <span>Active</span>}

      <div className='flex gap-2'>
        {visible ? (
          <Button onClick={() => d(changeLayerVisibility(id))}>Виден</Button>
        ) : (
          <Button onClick={() => d(changeLayerVisibility(id))}>Скрыт</Button>
        )}
        <Dropdown menu={{ items }} placement='bottomRight' trigger={['click']}>
          <Button>...</Button>
        </Dropdown>
      </div>
    </div>
  );
}
