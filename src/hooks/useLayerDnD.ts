import { moveLayer } from '@/redux/history';
import { useAppDispatch } from '@/redux/hooks';
import { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

interface IUseLayerDnD {
  ref: React.RefObject<HTMLDivElement>;
  index: number;
  renameInputVisible: boolean;
}

export const useLayerDnD = ({
  ref,
  index,
  renameInputVisible,
}: IUseLayerDnD) => {
  const d = useAppDispatch();
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: 'LAYER',
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: !renameInputVisible, // Disable dragging while renaming
    end: (_item, monitor) => {
      if (!monitor.didDrop() || dragIndex === null || dragIndex === index) return;
      d(moveLayer({ from: index, to: dragIndex }));
      setDragIndex(null);
    },
  });

  const [{ isOver, dropPosition }, dropRef] = useDrop({
    accept: 'LAYER',
    drop: (draggedItem: {
      index: number;
    }) => {
      if (draggedItem.index !== index) {
        d(moveLayer({ from: draggedItem.index, to: index }));
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      dropPosition: monitor.getItem()
        ? monitor.getItem().index > index ? 'top' : 'bottom'
        : null,
    }),
  });

  dragRef(dropRef(ref));

  return { isDragging, isOver, dropPosition };
};
