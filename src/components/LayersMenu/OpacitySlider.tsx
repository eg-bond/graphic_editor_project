import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { changeOpacity } from '@/redux/history';
import { selectActiveLayer } from '@/redux/history';
import { InputNumber, InputNumberProps, Slider } from 'antd';
import { useEffect, useState } from 'react';

enum InputRanges {
  MIN = 0,
  MAX = 100,
}

export function OpacitySlider() {
  const activeLayer = useAppSelector(selectActiveLayer);
  const activeLayerIndex = useAppSelector(
    state => state.history.items[state.history.activeItemIndex]?.activeLayerIndex,
  );
  const d = useAppDispatch();

  const [value, setValue] = useState(InputRanges.MAX);

  const onChangeComplete: InputNumberProps['onChange'] = (newValue) => {
    d(changeOpacity({ activeLayerIndex, opacity: Number(newValue) }));
  };

  useEffect(() => {
    setValue(activeLayer?.opacity ?? InputRanges.MAX);
  }, [activeLayer]);

  return (
    <div className="m-2">
      <h2 className="text-center">Непрозрачность</h2>

      <div className="flex gap-2 justify-between items-center">
        <Slider
          className="flex-[0.75]"
          min={InputRanges.MIN}
          max={InputRanges.MAX}
          onChange={setValue}
          onChangeComplete={onChangeComplete}
          value={value}
          tooltip={{ open: false }}
          disabled={!activeLayer}
        />
        <InputNumber className="flex-[0.25]" value={value} readOnly />
      </div>
    </div>
  );
}
