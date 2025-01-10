import { LayersList } from './LayersList';
import { OpacitySlider } from './OpacitySlider';
import { useAppDispatch } from '@/redux/hooks';
import { PlusOutlined } from '@ant-design/icons';
import { addLayer } from '@/redux/history';
import { Button } from 'antd';
import { useCallback } from 'react';

export function LayersMenu() {
  const d = useAppDispatch();

  const handleAddLayer = useCallback(() => {
    d(addLayer());
  }, [d]);

  return (
    <div className='h-1/2'>
      <div className='h-full flex flex-col'>
        <h1 className='m-2 text-2xl text-center'>Слои</h1>
        {/* Add layer button */}
        <div className='m-2'>
          <Button
            icon={<PlusOutlined />}
            block
            onClick={() => handleAddLayer()}></Button>
        </div>

        <OpacitySlider />
        <LayersList />
      </div>
    </div>
  );
}
