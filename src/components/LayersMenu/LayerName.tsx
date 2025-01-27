import { useAppDispatch } from '@/redux/hooks';
import { changeLayerName, removeLayer } from '@/redux/history';
import { LayerT } from '@/redux/history/historySlice';
import { Form, Input, InputRef, Menu } from 'antd';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { handleLayerContextMenu } from '@/utils/layerHandlers';
import { MENU_HEIGHT, MENU_WIDTH, NEW_LAYER_NAME } from '@/utils/constants';

type ILayerName = {
  i: number;
  name: LayerT['name'];
  renameInputVisible: boolean;
  setRenameInputVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: () => void;
};

export function LayerName({
  i,
  name,
  renameInputVisible,
  setRenameInputVisible,
  onClick,
}: ILayerName) {
  const d = useAppDispatch();
  const inputRef = useRef<InputRef | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [inputValue, setInputValue] = useState<string>(name);
  const [error, setError] = useState<string | null>(null);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  useEffect(() => {
    if (renameInputVisible) {
      setInputValue(name);
    }
  }, [renameInputVisible, name]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (error) setError(null);
  };

  const handleSubmit = () => {
    const trimmedName = inputValue.trim() || `${NEW_LAYER_NAME}${i + 1}`;
    d(changeLayerName({ index: i, name: trimmedName }));
    setRenameInputVisible(false);
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleLayerContextMenu(
      e,
      menuRef,
      MENU_WIDTH,
      MENU_HEIGHT,
      setMenuPosition,
      setContextMenuVisible,
    );
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        contextMenuVisible
      ) {
        setContextMenuVisible(false);
      }
    };

    if (contextMenuVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [contextMenuVisible]);

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
        d(removeLayer({ index: i }));
        setContextMenuVisible(false);
      },
    },
  ];

  return (
    <div
      className="flex-[0.75]"
      onClick={onClick}
      onDoubleClick={() => {
        setRenameInputVisible(true);
        setContextMenuVisible(false);
      }}
      onContextMenu={handleContextMenu}
    >
      {renameInputVisible
        ? (
            <Form onFinish={handleSubmit}>
              <Input
                ref={inputRef}
                name="change_layer_name"
                type="text"
                maxLength={12}
                value={inputValue}
                onChange={handleChange}
                onBlur={handleSubmit}
                autoFocus
              />
              {error && <span className="text-red-500 text-sm">{error}</span>}
            </Form>
          )
        : (
            <span>{name}</span>
          )}

      {contextMenuVisible && (
        <div
          ref={menuRef}
          className="absolute bg-white border border-gray-300 rounded-lg shadow-md"
          style={{
            left: menuPosition.x,
            top: menuPosition.y,
            zIndex: 1000,
          }}
        >
          <Menu
            items={menuItems}
            onClick={({ key }) => {
              const selectedItem = menuItems.find(item => item.key === key);
              if (selectedItem && selectedItem.onClick) {
                selectedItem.onClick();
              }
            }}
          />
        </div>

      )}
    </div>
  );
}
