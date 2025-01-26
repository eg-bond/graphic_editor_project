import { FC, memo, useCallback } from 'react';
import { Button, Popover, Slider, Tooltip } from 'antd';
import { LineWidthIcon } from '@/components/Tools/ToolsIcon';
import { useAppDispatch } from '@/redux/hooks.ts';
import { setLineWidth } from '@/redux/tools';

const marks = {
  1: '1',
  5: '5',
  10: '10',
  15: '15',
  20: '20',
  25: '25',
};

const LineWidthChanger1: FC = () => {
  const d = useAppDispatch();

  const handleChange = useCallback((value: number) => {
    d(setLineWidth(value));
  }, [d]);

  return (
    <Tooltip title="Толщина инструмента" placement="right">
      <Popover
        placement="bottomRight"
        trigger="click"
        content={(
          <Slider
            onChangeComplete={handleChange}
            min={1}
            max={25}
            className="w-[200px]"
            marks={marks}
            defaultValue={5}
          />
        )}
      >
        <Button type="text" icon={<LineWidthIcon />} className="hover:bg-gray-100" />
      </Popover>
    </Tooltip>
  );
};

export const LineWidthChanger = memo(LineWidthChanger1);
