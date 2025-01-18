import {
  BorderOutlined,
  DeleteOutlined,
  EditOutlined,
  FrownOutlined,
  LineOutlined,
} from '@ant-design/icons';
import ColorPicker from 'antd/es/color-picker';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectColor, selectTool, ToolKinds } from '@/redux/tools';
import { ToolButton } from './ToolButton';
import { AggregationColor } from 'antd/es/color-picker/color';
import { DEFAULT_TOOLS_COLOR } from '@/utils/constants';

const TOOLS = [
  {
    title: 'Кисть',
    icon: <EditOutlined />,
    type: ToolKinds.Brush,
  },
  {
    title: 'Ластик',
    icon: <DeleteOutlined />,
    type: ToolKinds.Eraser,
  },
  {
    title: 'Линия',
    icon: <LineOutlined />,
    type: ToolKinds.Line,
  },
  {
    title: 'Круг',
    icon: <FrownOutlined />,
    type: ToolKinds.Circle,
  },
  {
    title: 'Квадрат',
    icon: <BorderOutlined />,
    type: ToolKinds.Rect,
  },
] as const;

export function Tools() {
  const d = useAppDispatch();
  const tool = useAppSelector(state => state.tools.tool);

  const onColorChange = (e: AggregationColor) => {
    d(selectColor({ color: e.toHexString() }));
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

      <ColorPicker
        defaultValue={DEFAULT_TOOLS_COLOR}
        onChangeComplete={onColorChange}
      />

    </div>
  );
}
