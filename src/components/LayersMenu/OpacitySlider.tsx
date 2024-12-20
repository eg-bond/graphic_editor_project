import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { changeOpacity } from '@/redux/layers';
import { selectActiveLayer } from '@/redux/layers/selectors';
import { Divider, InputNumber, InputNumberProps, Slider } from 'antd';

export function OpacitySlider() {
  const activeLayer = useAppSelector(selectActiveLayer);
  const d = useAppDispatch();

  // TODO: make debounce or somth
  // TODO: make proper types
  const onChange: InputNumberProps['onChange'] = newValue => {
    d(changeOpacity({ id: activeLayer.id, opacity: newValue }));
  };

  return (
    <div>
      <h2>Непрозрачность</h2>
      <Divider className='m-0' />
      <div className='flex justify-between items-center'>
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
