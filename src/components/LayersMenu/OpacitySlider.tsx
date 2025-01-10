import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { changeOpacity } from '@/redux/history';
import { selectActiveLayer } from '@/redux/history';
import { InputNumber, InputNumberProps, Slider } from 'antd';

enum InputRanges {
  MIN = 0,
  MAX = 100,
}

export function OpacitySlider() {
  const activeLayer = useAppSelector(selectActiveLayer);
  const activeLayerIndex = useAppSelector(
    state => state.history.items[state.history.activeItemIndex]?.activeLayerIndex
  );
  const d = useAppDispatch();

  // TODO: make debounce or somth
  const onChange: InputNumberProps['onChange'] = newValue => {
    d(changeOpacity({ activeLayerIndex, opacity: Number(newValue) }));
  };

  return (
    <div className='m-2'>
      <h2 className='text-center'>Непрозрачность</h2>

      <div className='flex gap-2 justify-between items-center'>
        <Slider
          className='flex-[0.75]'
          min={InputRanges.MIN}
          max={InputRanges.MAX}
          onChange={onChange}
          value={activeLayer?.opacity || 0}
          disabled={!activeLayer}
        />
        <InputNumber
          className='flex-[0.25]'
          min={InputRanges.MIN}
          max={InputRanges.MAX}
          value={activeLayer?.opacity || 0}
          onChange={onChange}
          disabled={!activeLayer}
        />
      </div>
    </div>
  );
}
