import { LayerHistoryActions } from '@/types/historyTypes';
import {
  DeleteOutlined,
  EyeOutlined,
  FileAddOutlined,
  FontSizeOutlined,
  SmallDashOutlined,
  VerticalAlignMiddleOutlined,
} from '@ant-design/icons';

export function ActionIcon({ type }: { type: LayerHistoryActions }) {
  switch (type) {
    case LayerHistoryActions.Add:
      return <FileAddOutlined />;
    case LayerHistoryActions.Remove:
      return <DeleteOutlined />;
    case LayerHistoryActions.Rename:
      return <FontSizeOutlined />;
    case LayerHistoryActions.ChangeOpacity:
      return <SmallDashOutlined />;
    case LayerHistoryActions.ChangeVisibility:
      return <EyeOutlined />;
    case LayerHistoryActions.ChangeOrder:
      return <VerticalAlignMiddleOutlined />;
    default:
      return <FileAddOutlined />;
  }
}
