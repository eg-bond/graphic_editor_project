import { useAppDispatch } from '@/redux/hooks';
import {
  activateLayer,
  changeLayerVisibility,
  removeLayer,
} from '@/redux/layers';
import { Button, Dropdown, MenuProps } from 'antd';
import type { LayerT } from '@/redux/layers/layersSlice';
import { useState } from 'react';
import LayerName from './LayerName';
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  MenuOutlined,
} from '@ant-design/icons';

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

  const handleLayerClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      d(activateLayer(id));
    }
  };

  return (
    <div
      className={`flex justify-between items-center gap-2 p-3 border-b-2 first:border-t-2 border-gray-500 hover: cursor-pointer
      ${active ? 'bg-slate-400' : ''}`}
      onClick={e => handleLayerClick(e)}>
      <LayerName
        id={id}
        name={name}
        isInputVisible={isInputVisible}
        setIsInputVisible={setIsInputVisible}
        onClick={() => d(activateLayer(id))}
      />

      <div className='flex gap-2'>
        {visible ? (
          <Button
            icon={<EyeOutlined />}
            onClick={() => d(changeLayerVisibility(id))}></Button>
        ) : (
          <Button
            icon={<EyeInvisibleOutlined />}
            onClick={() => d(changeLayerVisibility(id))}></Button>
        )}
        <Dropdown menu={{ items }} placement='bottomRight' trigger={['click']}>
          <Button icon={<MenuOutlined />}></Button>
        </Dropdown>
      </div>
    </div>
  );
}
