import React, { useCallback, useEffect } from 'react';
import { LayersList } from './LayersList';
import { OpacitySlider } from './OpacitySlider';
import { useAppDispatch } from '@/redux/hooks';
import { PlusOutlined } from '@ant-design/icons';
import { addLayer, layerUp, layerDown } from '@/redux/history';
import { Button } from 'antd';

export function LayersMenu() {
  const d = useAppDispatch();

  const handleAddLayer = useCallback(() => {
    d(addLayer());
  }, [d]);

  // Обработка горячих клавиш по перемещению активного слоя
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'z') {
        d(layerUp());
        e.preventDefault();
      } else if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'z') {
        d(layerDown());
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [d]);

  return (
    <div className="h-1/2">
      <div className="h-full flex flex-col">
        <h1 className="m-2 text-2xl text-center">Слои</h1>
        {/* Add layer button */}
        <div className="m-2">
          <Button
            icon={<PlusOutlined />}
            block
            onClick={() => handleAddLayer()}
          >
            Добавить слой
          </Button>
        </div>

        <OpacitySlider />
        <LayersList />
      </div>
    </div>
  );
}
