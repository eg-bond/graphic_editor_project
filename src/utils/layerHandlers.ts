import { Dispatch } from '@reduxjs/toolkit';
import { changeLayerName, removeLayer } from '@/redux/history';
import { NEW_LAYER_NAME } from '@/utils/constants';

export const handleRenameLayer = (
  dispatch: Dispatch,
  index: number,
  name: string,
  setRenameInputVisible: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  let trimmedName = name.trim();

  if (trimmedName === '') {
    trimmedName = NEW_LAYER_NAME + String(index + 1);
  }

  dispatch(changeLayerName({ index, name: trimmedName }));
  setRenameInputVisible(false);
};

export const handleDeleteLayer = (
  dispatch: Dispatch,
  index: number,
  setContextMenuVisible: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  dispatch(removeLayer({ index }));
  setContextMenuVisible(false);
};

export const handleLayerContextMenu = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  menuRef: React.RefObject<HTMLDivElement>,
  menuWidth: number,
  menuHeight: number,
  setMenuPosition: React.Dispatch<React.SetStateAction<{
    x: number; y: number;
  }>>,
  setContextMenuVisible: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  e.preventDefault();

  if (menuRef.current && menuRef.current.contains(e.target as Node)) {
    return;
  }

  const { clientX: x, clientY: y } = e;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const adjustedX = x + menuWidth > viewportWidth ? viewportWidth - menuWidth : x;
  const adjustedY = y + menuHeight > viewportHeight ? viewportHeight - menuHeight : y;

  setMenuPosition({ x: adjustedX, y: adjustedY });
  setContextMenuVisible(true);
};
