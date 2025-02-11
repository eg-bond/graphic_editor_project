import { FC, memo, useCallback } from 'react';
import { Button, Popover, Slider, Tooltip } from 'antd';
import { LineWidthIcon } from '@/components/Tools/ToolsIcon';
import { useAppDispatch } from '@/redux/hooks.ts';
import { setLineWidth } from '@/redux/tools';
import { LINE_WIDTH_MIN, LINE_WIDTH_MAX } from '@/redux/tools/toolsSlice.ts';
import { useLineWidthHotkeys } from '@/hooks/hotkeyHooks/useLineWidthHotkeys.ts';

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
  useLineWidthHotkeys();
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
            min={LINE_WIDTH_MIN}
            max={LINE_WIDTH_MAX}
            className="w-[200px]"
            marks={marks}
            defaultValue={5}
          />
        )}
      >
        <Button type="text" icon={<LineWidthIcon />} className="hover:!bg-cBlue" />
      </Popover>
    </Tooltip>
  );
};

export const LineWidthChanger = memo(LineWidthChanger1);
