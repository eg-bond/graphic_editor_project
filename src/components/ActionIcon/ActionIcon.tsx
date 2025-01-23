import { HistoryItemKinds } from '@/types/historyTypes';
import {
  DeleteOutlined,
  EyeOutlined,
  FileAddOutlined,
  FolderOpenOutlined,
  FontSizeOutlined,
  HighlightOutlined,
  LineOutlined,
  SmallDashOutlined,
  VerticalAlignMiddleOutlined,
} from '@ant-design/icons';

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
      return <HighlightOutlined />;
    case HistoryItemKinds.Line:
      return <LineOutlined />;
    case HistoryItemKinds.OpenProject:
      return <FolderOpenOutlined />;
    default:
      return <FileAddOutlined />;
  }
}
