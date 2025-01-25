import { HistoryItemKinds } from '@/types/historyTypes';
import {
  DeleteOutlined,
  EyeOutlined,
  FileAddOutlined,
  FolderOpenOutlined,
  FontSizeOutlined,
  SmallDashOutlined,
  VerticalAlignMiddleOutlined,
} from '@ant-design/icons';
import {
  BrushIcon, CircleIcon,
  EraserIcon, LineIcon, RectIcon, ResizeIcon,
} from '../Tools/ToolsIcon';

interface IActionIconProps {
  kind: HistoryItemKinds;
}

export function ActionIcon({ kind }: IActionIconProps) {
  switch (kind) {
    case HistoryItemKinds.Add:
      return <FileAddOutlined />;
    case HistoryItemKinds.Remove:
      return <DeleteOutlined />;
    case HistoryItemKinds.Rename:
      return <FontSizeOutlined />;
    case HistoryItemKinds.Opacity:
      return <SmallDashOutlined />;
    case HistoryItemKinds.Visibility:
      return <EyeOutlined />;
    case HistoryItemKinds.Order:
      return <VerticalAlignMiddleOutlined />;
    case HistoryItemKinds.Brush:
      return <BrushIcon />;
    case HistoryItemKinds.Line:
      return <LineIcon />;
    case HistoryItemKinds.Rect:
      return <RectIcon />;
    case HistoryItemKinds.Circle:
      return <CircleIcon />;
    case HistoryItemKinds.Eraser:
      return <EraserIcon />;
    case HistoryItemKinds.OpenProject:
      return <FolderOpenOutlined />;
    case HistoryItemKinds.ResizeCanvas:
      return <ResizeIcon />;
    default:
      return <FileAddOutlined />;
  }
}
