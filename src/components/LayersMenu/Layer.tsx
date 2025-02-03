import React, { memo, useCallback, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Button } from 'antd';
import {
  activateLayer,
  changeLayerVisibility,
  moveLayerDown,
  moveLayerUp,
  moveLayer,
} from '@/redux/history';
import { LayerName } from './LayerName';
import {
  DownOutlined, EyeInvisibleOutlined,
  EyeOutlined, UpOutlined,
} from '@ant-design/icons';
import { LayerT } from '@/redux/history/historySlice';
import { selectActiveLayerIndex } from '@/redux/history/selectors';
import { useDrag, useDrop } from 'react-dnd';

interface ILayerProps {
  i: number;
  lastElementIndex: number;
  name: LayerT['name'];
  visible: LayerT['visible'];
  isActive: boolean;
}

export const Layer = memo<ILayerProps>(function Layer({
  i,
  lastElementIndex,
  name,
  visible,
}: ILayerProps) {
  const activeLayerIndex = useAppSelector(selectActiveLayerIndex);
  const d = useAppDispatch();
  const [renameInputVisible, setRenameInputVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [{ isDragging }, dragRef] = useDrag({
    type: 'LAYER',
    item: { index: i },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    end: (_item, monitor) => {
      if (!monitor.didDrop() || dragIndex === null || dragIndex === i) return;
      d(moveLayer({ from: i, to: dragIndex }));
      setDragIndex(null);
    },
  });

  const [, dropRef] = useDrop({
    accept: 'LAYER',
    drop: (draggedItem: {
      index: number;
    }) => {
      if (draggedItem.index !== i) {
        d(moveLayer({ from: draggedItem.index, to: i }));
      }
    },
  });

  dragRef(dropRef(ref));

  const handleActivateLayer = useCallback(() => {
    if (activeLayerIndex === i) return;
    d(activateLayer({ index: i }));
  }, [d, activeLayerIndex, i]);

  const handleLayerClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      handleActivateLayer();
    }
  };

  const handleChangeVisibility = useCallback(() => {
    d(changeLayerVisibility({ index: i }));
  }, [d, i]);

  const handleMoveLayerUp = useCallback(() => {
    if (i === 0) return;
    d(moveLayerUp({ index: i }));
  }, [d, i]);

  const handleMoveLayerDown = useCallback(() => {
    if (i === lastElementIndex) return;
    d(moveLayerDown({ index: i }));
  }, [d, i, lastElementIndex]);

  const staticClasses =
    'flex justify-between items-center gap-2 px-2 py-1 border-b-2 border-gray-500 first:border-t-2 hover: cursor-pointer';
  const dynamicClasses = (isActive: boolean) =>
    isActive ? 'bg-slate-400' : '';

  return (
    <div
      ref={ref}
      className={`${staticClasses} ${dynamicClasses(activeLayerIndex === i)} ${
        isDragging ? 'opacity-50' : ''
      }`}
      onClick={handleLayerClick}
    >
      {/* Кнопки перемещения вверх и вниз */}
      <div className="flex flex-col gap-1 mr-2">
        <Button onClick={handleMoveLayerUp} icon={<UpOutlined />} />
        <Button onClick={handleMoveLayerDown} icon={<DownOutlined />} />
      </div>

      {/* Имя слоя */}
      <LayerName
        i={i}
        name={name}
        renameInputVisible={renameInputVisible}
        setRenameInputVisible={setRenameInputVisible}
        onClick={handleActivateLayer}
      />

      <div className="flex-[0.25] flex justify-end gap-2">
        {/* Кнопка скрытия слоя */}
        <Button
          icon={visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          onClick={handleChangeVisibility}
        />
      </div>
    </div>
  );
});
