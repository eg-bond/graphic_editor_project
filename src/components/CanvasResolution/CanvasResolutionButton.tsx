import { FC } from 'react';
import { Button } from 'antd';
import { useModal } from '@/hooks/useModal';
import { CanvasResolutionModal } from './CanvasResolutionModal';

export const CanvasResolutionButton: FC = () => {
  const {
    open,
    onOpen,
    onClose,
  } = useModal();

  return (
    <>
      <Button
        type="primary"
        className="absolute top-4 right-4"
        onClick={onOpen}
      >
        Изменить разрешение холста
      </Button>
      {open && <CanvasResolutionModal open={open} onClose={onClose} />}
    </>
  );
};
