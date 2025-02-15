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
  EraserIcon, FillIcon, LineIcon, RectIcon,
  ResizeIcon,
  TriangleIcon,
} from '../Tools/ToolsIcon';
import MoveIcon from '../Tools/ToolsIcon/MoveIcon';

interface IHistoryItemIcon {
  kind: HistoryItemKinds;
}

export function HistoryItemIcon({ kind }: IHistoryItemIcon) {
  switch (kind) {
    case HistoryItemKinds.Add:
      return <FileAddOutlined style={{ fontSize: '20px' }} />;
    case HistoryItemKinds.Remove:
      return <DeleteOutlined style={{ fontSize: '20px' }} />;
    case HistoryItemKinds.Rename:
      return <FontSizeOutlined style={{ fontSize: '20px' }} />;
    case HistoryItemKinds.Opacity:
      return <SmallDashOutlined style={{ fontSize: '20px' }} />;
    case HistoryItemKinds.Visibility:
      return <EyeOutlined style={{ fontSize: '20px' }} />;
    case HistoryItemKinds.Order:
      return <VerticalAlignMiddleOutlined style={{ fontSize: '20px' }} />;
    case HistoryItemKinds.Brush:
      return <BrushIcon />;
    case HistoryItemKinds.Fill:
      return <FillIcon />;
    case HistoryItemKinds.Triangle:
      return <TriangleIcon />;
    case HistoryItemKinds.Line:
      return <LineIcon />;
    case HistoryItemKinds.Rect:
      return <RectIcon />;
    case HistoryItemKinds.Circle:
      return <CircleIcon />;
    case HistoryItemKinds.Eraser:
      return <EraserIcon />;
    case HistoryItemKinds.Move:
      return <MoveIcon />;
    case HistoryItemKinds.OpenProject:
      return <FolderOpenOutlined style={{ fontSize: '20px' }} />;
    case HistoryItemKinds.ResizeCanvas:
      return <ResizeIcon />;
    default:
      return <FileAddOutlined />;
  }
}
