import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Button } from 'antd';
import {
  activateLayer,
  changeLayerVisibility,
} from '@/redux/history';
import { LayerName } from './LayerName';
import {
  EyeInvisibleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { LayerT } from '@/redux/history/historySlice';
import { selectActiveLayerIndex } from '@/redux/history/selectors';
import { useLayerDnD } from '@/hooks/useLayerDnD';

interface ILayerProps {
  index: number;
  name: LayerT['name'];
  visible: LayerT['visible'];
}

export const Layer = memo<ILayerProps>(function Layer({
  index,
  name,
  visible,
}: ILayerProps) {
  const d = useAppDispatch();
  const activeLayerIndex = useAppSelector(selectActiveLayerIndex);
  const [renameInputVisible, setRenameInputVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const {
    isDragging,
    isOver,
    dropPosition,
  } = useLayerDnD({ ref, index, renameInputVisible });

  const handleActivateLayer = useCallback(() => {
    if (activeLayerIndex === index) return;
    d(activateLayer({ index }));
  }, [d, activeLayerIndex, index]);

  const handleLayerClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      handleActivateLayer();
    }
  };

  const handleChangeVisibility = useCallback(() => {
    d(changeLayerVisibility({ index }));
  }, [d, index]);

  // Стили для компоненты
  const staticClasses = useMemo(() => {
    return [
      'relative',
      'flex',
      'justify-between',
      'items-center',
      'gap-2',
      'px-2',
      'py-1',
      'border-b-2',
      'border-gray-500',
      'first:border-t-2',
      'hover:cursor-pointer',
    ].join(' ');
  }, []);

  const dynamicClasses = useCallback((isActive: boolean) => {
    const classes = [
      isActive && 'bg-slate-400',
      isDragging && 'opacity-50 ',
      isOver && 'bg-blue-100',
    ];

    return classes.filter(Boolean).join(' ');
  }, [isDragging, isOver]);

  return (
    <div
      ref={ref}
      className={`${staticClasses} ${dynamicClasses(activeLayerIndex === index)}`}
      onClick={handleLayerClick}
    >
      {/* Линии для индикации drag and drop */}
      {isOver && (
        <>
          {/* Верхняя линия */}
          <div
            className="absolute left-0 right-0 top-0 h-0.5 bg-blue-500"
            style={{
              opacity: dropPosition === 'top' ? 1 : 0,
            }}
          />
          {/* Нижняя линия */}
          <div
            className="absolute left-0 right-0 bottom-0 h-0.5 bg-blue-500"
            style={{
              opacity: dropPosition === 'bottom' ? 1 : 0,
            }}
          />
        </>
      )}

      {/* Имя слоя */}
      <LayerName
        i={index}
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
