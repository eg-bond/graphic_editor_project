import { useAppDispatch } from '@/redux/hooks';
import { changeLayerName, removeLayer } from '@/redux/history';
import { LayerT } from '@/redux/history/historySlice';
import { Form, Input, InputRef, Menu, Dropdown } from 'antd';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { NEW_LAYER_NAME } from '@/utils/constants';

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
  const [inputValue, setInputValue] = useState<string>(name);
  const [error, setError] = useState<string | null>(null);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{
    x: number; y: number;
  }>({
    x: 0,
    y: 0,
  });

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
    let trimmedName = inputValue.trim();

    if (trimmedName === '') {
      trimmedName = NEW_LAYER_NAME + String(i + 1);
    }

    d(changeLayerName({ index: i, name: trimmedName }));
    setRenameInputVisible(false);
  };

  const handleDoubleClick = () => {
    setRenameInputVisible(true);
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setContextMenuVisible(true);
  };

  const handleMenuClick = ({ key }: {
    key: string;
  }) => {
    if (key === 'rename') {
      setRenameInputVisible(true);
    } else if (key === 'delete') {
      d(removeLayer({ index: i }));
    }
    setContextMenuVisible(false);
  };

  const contextMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="rename">Переименовать</Menu.Item>
      <Menu.Item key="delete" danger>
        Удалить
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      className="flex-[0.75]"
      onDoubleClick={handleDoubleClick}
      onClick={onClick}
      onContextMenu={handleContextMenu}
    >
      {renameInputVisible && (
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
      )}

      {!renameInputVisible && <span>{name}</span>}

      {contextMenuVisible && (
        <Dropdown overlay={contextMenu} visible>
          <div
            style={{
              position: 'absolute',
              left: menuPosition.x,
              top: menuPosition.y,
              zIndex: 1000,
            }}
          />
        </Dropdown>
      )}
    </div>
  );
}
