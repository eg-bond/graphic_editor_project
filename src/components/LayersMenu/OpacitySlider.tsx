import { useAppSelector } from '@/redux/hooks';
import { selectActiveLayer } from '@/redux/layers/selectors';
import { Divider, Slider } from 'antd';

export function OpacitySlider() {
  const activeLayer = useAppSelector(selectActiveLayer);
  return (
    <div>
      <h2>Непрозрачность</h2>
      <Divider className='m-0' />
      <Slider value={activeLayer?.opacity || 0} />
    </div>
  );
}
