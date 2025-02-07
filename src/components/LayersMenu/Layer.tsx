import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Button, Menu } from 'antd';
import {
  activateLayer,
  changeLayerVisibility,
  removeLayer,
} from '@/redux/history';
import { LayerName } from './LayerName';
import {
  EyeInvisibleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { LayerT } from '@/redux/history/historySlice';
import { selectActiveLayerIndex } from '@/redux/history/selectors';
import { useLayerDnD } from '@/hooks/useLayerDnD';
import { useContextMenu } from '@/hooks/useContextMenu';

interface ILayerProps {
  index: number;
  name: LayerT['name'];
  visible: LayerT['visible'];
  oneLayerLeft: boolean;
}

export const Layer = memo<ILayerProps>(function Layer({
  index,
  name,
  visible,
  oneLayerLeft,
}: ILayerProps) {
  const d = useAppDispatch();
  const activeLayerIndex = useAppSelector(selectActiveLayerIndex);
  const [renameInputVisible, setRenameInputVisible] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  // Логика для функционирования drag and drop
  const {
    isDragging,
    isOver,
    dropPosition,
  } = useLayerDnD({ ref, index, renameInputVisible });
  // Менюшка, которая вылезает при нажатии ПКМ
  const {
    menuRef,
    contextMenuVisible,
    menuPosition,
    handleContextMenu,
    setContextMenuVisible,
  } = useContextMenu();

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

  const menuItems = [
    {
      key: 'rename',
      label: 'Переименовать',
      onClick: () => {
        setRenameInputVisible(true);
        setContextMenuVisible(false);
      },
    },
    {
      key: 'delete',
      label: 'Удалить',
      danger: true,
      onClick: () => {
        if (oneLayerLeft) {
          setShowWarning(true);
          setTimeout(() => setShowWarning(false), 500);
        } else {
          d(removeLayer({ index }));
        }
        setContextMenuVisible(false);
      },
    },
  ];

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
      'transition-all',
    ].join(' ');
  }, []);

  const dynamicClasses = useCallback((isActive: boolean) => {
    const classes = [
      isActive && 'bg-slate-400',
      isDragging && 'opacity-50 ',
      isOver && 'bg-blue-100',
      showWarning && 'border-red-400',
    ];

    return classes.filter(Boolean).join(' ');
  }, [isDragging, isOver, showWarning]);

  return (
    <div
      ref={ref}
      className={`${staticClasses} ${dynamicClasses(activeLayerIndex === index)}`}
      onClick={handleLayerClick}
      onContextMenu={handleContextMenu}
    >

      {/* Имя слоя */}
      <LayerName
        index={index}
        name={name}
        renameInputVisible={renameInputVisible}
        setRenameInputVisible={setRenameInputVisible}
        onClick={handleActivateLayer}
      />

      {/* Кнопка скрытия слоя */}
      <div className="flex-[0.25] flex justify-end gap-2">
        <Button
          icon={visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          onClick={handleChangeVisibility}
        />
      </div>

      {/* ПКМ меню */}
      {contextMenuVisible && (
        <div
          ref={menuRef}
          className="fixed bg-white border border-gray-300 rounded-lg shadow-md"
          style={{
            left: menuPosition.x,
            top: menuPosition.y,
            zIndex: 1000,
          }}
        >
          <Menu
            items={menuItems}
          />
        </div>
      )}

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
    </div>
  );
});
