import { useAppDispatch } from '@/redux/hooks';
import {
  activateLayer,
  changeLayerVisibility,
  removeLayer,
} from '@/redux/layers';
import { Button, Dropdown, MenuProps } from 'antd';
import type { LayerT } from '@/redux/layers/layersSlice';
import { useState } from 'react';
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { LayerName } from './LayerName';

interface ILayerProps {
  id: LayerT['id'];
  name: LayerT['name'];
  active: LayerT['active'];
  visible: LayerT['visible'];
}

export function Layer({ id, name, active, visible }: ILayerProps) {
  const d = useAppDispatch();
  const [renameInputVisible, setRenameInputVisible] = useState(false);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Переименовать',
      onClick: () => setRenameInputVisible(true),
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

  const staticClasses =
    'flex justify-between items-center gap-2 p-3 border-b-2 first:border-t-2 border-gray-500 hover: cursor-pointer';
  const dynamicClasses = (isActive: boolean) =>
    isActive ? 'bg-slate-400' : '';

  return (
    <div
      className={`${staticClasses} ${dynamicClasses(active)}`}
      onClick={e => handleLayerClick(e)}>
      <LayerName
        id={id}
        name={name}
        renameInputVisible={renameInputVisible}
        setIsInputVisible={setRenameInputVisible}
        onClick={() => d(activateLayer(id))}
      />

      <div className='flex-[0.25] flex justify-end gap-2'>
        {/* Hide layer button */}
        <Button
          icon={visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          onClick={() => d(changeLayerVisibility(id))}
        />
        {/* Menu button with 'rename' and 'delete' options */}
        <Dropdown menu={{ items }} placement='bottomRight' trigger={['click']}>
          <Button icon={<MenuOutlined />}></Button>
        </Dropdown>
      </div>
    </div>
  );
}
