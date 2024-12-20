import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { changeOpacity } from '@/redux/layers';
import { selectActiveLayer } from '@/redux/layers/selectors';
import { InputNumber, InputNumberProps, Slider } from 'antd';

export function OpacitySlider() {
  const activeLayer = useAppSelector(selectActiveLayer);
  const d = useAppDispatch();

  // TODO: make debounce or somth
  // TODO: make proper types
  const onChange: InputNumberProps['onChange'] = newValue => {
    d(changeOpacity({ id: activeLayer.id, opacity: newValue }));
  };

  return (
    <div className='m-2'>
      <h2 className='text-center'>Непрозрачность</h2>

      <div className='flex gap-2 justify-between items-center'>
        <Slider
          className='flex-grow'
          min={0}
          max={100}
          onChange={onChange}
          value={activeLayer?.opacity || 0}
          disabled={!activeLayer}
        />
        <InputNumber
          min={0}
          max={100}
          value={activeLayer?.opacity || 0}
          onChange={onChange}
          disabled={!activeLayer}
        />
      </div>
    </div>
  );
}
