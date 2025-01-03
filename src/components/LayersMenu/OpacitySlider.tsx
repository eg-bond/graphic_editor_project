import { addNewHistoryItemThunk } from '@/redux/history';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { changeOpacity } from '@/redux/layers';
import { selectActiveLayer } from '@/redux/layers/selectors';
import { HistoryItemKinds } from '@/types/historyTypes';
import { InputNumber, InputNumberProps, Slider } from 'antd';
import { useEffect, useState } from 'react';

enum InputRanges {
  MIN = 0,
  MAX = 100,
}

export function OpacitySlider() {
  const activeLayer = useAppSelector(selectActiveLayer);
  const d = useAppDispatch();

  const [value, setValue] = useState(InputRanges.MAX);

  const onChangeComplete: InputNumberProps['onChange'] = newValue => {
    d(changeOpacity({ opacity: Number(newValue) }));
    d(addNewHistoryItemThunk(HistoryItemKinds.Opacity));
  };

  useEffect(() => {
    setValue(activeLayer?.opacity || InputRanges.MAX);
  }, [activeLayer]);

  return (
    <div className='m-2'>
      <h2 className='text-center'>Непрозрачность</h2>

      <div className='flex gap-2 justify-between items-center'>
        <Slider
          className='flex-[0.75]'
          min={InputRanges.MIN}
          max={InputRanges.MAX}
          onChange={setValue}
          onChangeComplete={onChangeComplete}
          value={value}
          tooltip={{ open: false }}
          disabled={!activeLayer}
        />
        <InputNumber className='flex-[0.25]' value={value} readOnly />
      </div>
    </div>
  );
}
