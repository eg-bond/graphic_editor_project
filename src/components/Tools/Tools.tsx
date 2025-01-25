import ColorPicker from 'antd/es/color-picker';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectColor, selectSecondaryColor,
  selectTool, ToolKinds,
} from '@/redux/tools';
import { ToolButton } from './ToolButton';
import { AggregationColor } from 'antd/es/color-picker/color';
import {
  DEFAULT_TOOLS_COLOR,
  DEFAULT_TOOLS_SECONDARY_COLOR,
} from '@/utils/constants';
import { BrushIcon, CircleIcon, EraserIcon, LineIcon, RectIcon } from './ToolsIcon';
import { Tooltip } from 'antd';
import { LineWidthChanger } from '@/components/Tools/LineWidthChanger.tsx';

const TOOLS = [
  {
    title: 'Кисть',
    icon: <BrushIcon />,
    type: ToolKinds.Brush,
  },
  {
    title: 'Ластик',
    icon: <EraserIcon />,
    type: ToolKinds.Eraser,
  },
  {
    title: 'Линия',
    icon: <LineIcon />,
    type: ToolKinds.Line,
  },
  {
    title: 'Круг',
    icon: <CircleIcon />,
    type: ToolKinds.Circle,
  },
  {
    title: 'Квадрат',
    icon: <RectIcon />,
    type: ToolKinds.Rect,
  },
] as const;

export function Tools() {
  const d = useAppDispatch();
  const tool = useAppSelector(state => state.tools.tool);

  const onColorChange = (e: AggregationColor) => {
    d(selectColor({ color: e.toHexString() }));
  };

  const onSecondaryColorChange = (e: AggregationColor) => {
    d(selectSecondaryColor({ color: e.toHexString() }));
  };

  return (
    <div className={
      'absolute left-4 top-4 flex flex-col ' +
      'gap-2 bg-white p-2 rounded-lg shadow-md'
    }
    >
      {TOOLS.map(({
        title,
        icon,
        type,
      }) => (
        <ToolButton
          key={type}
          title={title}
          icon={icon}
          isSelected={tool === type}
          onClick={() => d(selectTool({ tool: type }))}
        />
      ))}

      <Tooltip title="Основной цвет" placement="right">
        <div>
          <ColorPicker
            defaultValue={DEFAULT_TOOLS_COLOR}
            onChangeComplete={onColorChange}
          />
        </div>
      </Tooltip>

      <Tooltip title="Второстепенный цвет" placement="right">
        <div>
          <ColorPicker
            defaultValue={DEFAULT_TOOLS_SECONDARY_COLOR}
            onChangeComplete={onSecondaryColorChange}
          />
        </div>
      </Tooltip>

      <LineWidthChanger />
    </div>
  );
}
