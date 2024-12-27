import { memo, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Button, Dropdown, MenuProps } from 'antd';
import {
  activateLayer,
  changeLayerVisibility,
  moveLayerDown,
  moveLayerUp,
  removeLayer,
} from '@/redux/layers';
import { LayerName } from './LayerName';
import {
  DownOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  MenuOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { LayerT } from '@/redux/layers/layersSlice';
import { addNewHistoryItemThunk } from '@/redux/history';
import { HistoryItemKinds } from '@/types/historyTypes';

interface ILayerProps {
  i: number;
  lastElementIndex: number;
  name: LayerT['name'];
  visible: LayerT['visible'];
}

// Single layer
export const Layer = memo<ILayerProps>(function Layer({
  i,
  lastElementIndex,
  name,
  visible,
}: ILayerProps) {
  const activeLayerIndex = useAppSelector(
    state => state.layers.activeLayerIndex
  );
  const d = useAppDispatch();
  const [renameInputVisible, setRenameInputVisible] = useState(false);

  const handleActivateLayer = useCallback(() => {
    if (activeLayerIndex === i) return;
    d(activateLayer({ index: i }));
  }, [d, activeLayerIndex, i]);

  const handleLayerClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      handleActivateLayer();
    }
  };

  const handleChangeVisibility = useCallback(() => {
    d(changeLayerVisibility({ index: i }));
    d(addNewHistoryItemThunk(HistoryItemKinds.Visibility));
  }, [d, i]);

  const handleRemoveLayer = useCallback(() => {
    d(removeLayer({ index: i }));
    d(addNewHistoryItemThunk(HistoryItemKinds.Remove));
  }, [d, i]);

  const handleMoveLayerUp = useCallback(() => {
    if (i === 0) return;
    d(moveLayerUp({ index: i }));
    d(addNewHistoryItemThunk(HistoryItemKinds.Order));
  }, [d, i]);

  const handleMoveLayerDown = useCallback(() => {
    if (i === lastElementIndex) return;
    d(moveLayerDown({ index: i }));
    d(addNewHistoryItemThunk(HistoryItemKinds.Order));
  }, [d, i, lastElementIndex]);

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
      onClick: () => handleRemoveLayer(),
    },
  ];

  const staticClasses =
    'flex justify-between items-center gap-2 px-2 py-1 border-b-2 first:border-t-2 border-gray-500 hover: cursor-pointer';
  const dynamicClasses = (isActive: boolean) =>
    isActive ? 'bg-slate-400' : '';

  return (
    <div
      className={`${staticClasses} ${dynamicClasses(activeLayerIndex === i)}`}
      onClick={e => handleLayerClick(e)}>
      {/* Buttons for moving layers up and down */}
      <div className='flex flex-col gap-1 mr-2'>
        <Button
          onClick={() => handleMoveLayerUp()}
          icon={<UpOutlined />}></Button>
        <Button
          onClick={() => handleMoveLayerDown()}
          icon={<DownOutlined />}></Button>
      </div>
      {/* Layer name component */}
      <LayerName
        i={i}
        name={name}
        renameInputVisible={renameInputVisible}
        setRenameInputVisible={setRenameInputVisible}
        onClick={() => handleActivateLayer()}
      />
      <div className='flex-[0.25] flex justify-end gap-2'>
        {/* Hide layer button */}
        <Button
          icon={visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          onClick={() => handleChangeVisibility()}
        />
        {/* Menu button with 'rename' and 'delete' options */}
        <Dropdown menu={{ items }} placement='bottomRight' trigger={['click']}>
          <Button icon={<MenuOutlined />}></Button>
        </Dropdown>
      </div>
    </div>
  );
});
