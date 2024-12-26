import { memo, useCallback, useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { Button, Dropdown, MenuProps } from 'antd';
import {
  activateLayer,
  changeLayerVisibility,
  removeLayer,
} from '@/redux/layers';
import { LayerName } from './LayerName';
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { LayerT } from '@/redux/layers/layersSlice';
import { addNewHistoryItem } from '@/redux/history';
import { LayerHistoryActions } from '@/redux/history/historySlice';

interface ILayerProps {
  id: LayerT['id'];
  name: LayerT['name'];
  active: LayerT['active'];
  visible: LayerT['visible'];
}

// Single layer
export const Layer = memo<ILayerProps>(function Layer({
  id,
  name,
  active,
  visible,
}: ILayerProps) {
  const d = useAppDispatch();
  const [renameInputVisible, setRenameInputVisible] = useState(false);

  const handleLayerClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      d(activateLayer(id));
    }
  };

  const handleChangeVisibility = useCallback((id: number) => {
    d(changeLayerVisibility(id));
    d(addNewHistoryItem(LayerHistoryActions.ChangeVisibility));
  }, []);

  const handleRemoveLayer = useCallback((id: number) => {
    d(removeLayer(id));
    d(addNewHistoryItem(LayerHistoryActions.Remove));
  }, []);

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
      onClick: () => handleRemoveLayer(id),
    },
  ];

  const staticClasses =
    'flex justify-between items-center gap-2 p-3 border-b-2 first:border-t-2 border-gray-500 hover: cursor-pointer';
  const dynamicClasses = (isActive: boolean) =>
    isActive ? 'bg-slate-400' : '';

  return (
    <div
      className={`${staticClasses} ${dynamicClasses(active)}`}
      onClick={e => handleLayerClick(e)}>
      {/* Layer name component */}
      <LayerName
        id={id}
        name={name}
        renameInputVisible={renameInputVisible}
        setRenameInputVisible={setRenameInputVisible}
        onClick={() => d(activateLayer(id))}
      />

      <div className='flex-[0.25] flex justify-end gap-2'>
        {/* Hide layer button */}
        <Button
          icon={visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          onClick={() => handleChangeVisibility(id)}
        />
        {/* Menu button with 'rename' and 'delete' options */}
        <Dropdown menu={{ items }} placement='bottomRight' trigger={['click']}>
          <Button icon={<MenuOutlined />}></Button>
        </Dropdown>
      </div>
    </div>
  );
});
