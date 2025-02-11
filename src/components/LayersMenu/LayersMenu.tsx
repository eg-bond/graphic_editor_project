import { useCallback } from 'react';
import { LayersList } from './LayersList';
import { OpacitySlider } from './OpacitySlider';
import { useAppDispatch } from '@/redux/hooks';
import { PlusOutlined } from '@ant-design/icons';
import { addLayer } from '@/redux/history';
import { Button } from 'antd';
import { useLayersHotkeys } from '@/hooks/hotkeyHooks/useLayersHotkeys';

export function LayersMenu() {
  const d = useAppDispatch();
  useLayersHotkeys();

  const handleAddLayer = useCallback(() => {
    d(addLayer());
  }, [d]);

  return (
    <div className="h-1/2">
      <div className="h-full flex flex-col">
        <h1 className="m-2 text-2xl text-center">Слои</h1>
        {/* Add layer button */}
        <div className="m-2">
          <Button
            className={
              'w-full text-white font-medium border-none ' +
              '!bg-cBlue hover:!bg-cBlueDark !text-white'
            }
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
