import { LayersList } from './LayersList';
import { OpacitySlider } from './OpacitySlider';
import { useAppDispatch } from '@/redux/hooks';
import { PlusOutlined } from '@ant-design/icons';
import { addLayer } from '@/redux/layers';
import { Button } from 'antd';
import { useCallback } from 'react';
import { LayerHistoryActions } from '@/types/historyTypes';
import { addNewHistoryItemThunk } from '@/redux/history';

export function LayersMenu() {
  const d = useAppDispatch();

  const handleAddLayer = useCallback(() => {
    d(addLayer());
    d(addNewHistoryItemThunk(LayerHistoryActions.Add));
  }, []);

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
