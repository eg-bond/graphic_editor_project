import { MENU_HEIGHT, MENU_WIDTH } from '@/utils/constants';
import { handleLayerContextMenu } from '@/utils/layerHandlers';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useContextMenu = () => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const handleContextMenu = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      handleLayerContextMenu(
        e,
        menuRef,
        MENU_WIDTH,
        MENU_HEIGHT,
        setMenuPosition,
        setContextMenuVisible,
      );
    }, [menuRef, setMenuPosition, setContextMenuVisible],
  );

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

  return {
    menuRef,
    menuPosition,
    contextMenuVisible,
    setContextMenuVisible,
    handleContextMenu,
  };
};
