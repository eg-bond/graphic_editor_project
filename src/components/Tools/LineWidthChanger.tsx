import { FC, memo, useCallback, useEffect, useState } from 'react';
import { Button, Popover, Slider, Tooltip } from 'antd';
import { LineWidthIcon } from '@/components/Tools/ToolsIcon';
import { useAppDispatch, useAppSelector } from '@/redux/hooks.ts';
import { setLineWidth } from '@/redux/tools';
import { useLineWidthHotkeys } from '@/hooks/hotkeyHooks/useLineWidthHotkeys.ts';
import {
  LINE_WIDTH_MIN,
  LINE_WIDTH_MAX,
  DEFAULT_LINE_WIDTH,
} from '@/redux/tools/toolsSlice.ts';

const marks = (() => {
  const result: {
    [key: number]: number;
  } = { [LINE_WIDTH_MIN]: LINE_WIDTH_MIN };
  for (let i = LINE_WIDTH_MIN + (5 - LINE_WIDTH_MIN % 5); i <= LINE_WIDTH_MAX; i += 5) {
    result[i] = i;
  }
  return result;
})();

const LineWidthChanger1: FC = () => {
  const d = useAppDispatch();
  const lineWidth = useAppSelector(state => state.tools.lineWidth);
  const [value, setValue] = useState(DEFAULT_LINE_WIDTH);
  useLineWidthHotkeys();

  useEffect(() => {
    setValue(lineWidth);
  }, [lineWidth]);

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
            className="w-[200px]"
            onChange={setValue}
            onChangeComplete={handleChange}
            min={LINE_WIDTH_MIN}
            max={LINE_WIDTH_MAX}
            marks={marks}
            value={value}
          />
        )}
      >
        <Button type="text" icon={<LineWidthIcon />} className="hover:!bg-cBlue" />
      </Popover>
    </Tooltip>
  );
};

export const LineWidthChanger = memo(LineWidthChanger1);
