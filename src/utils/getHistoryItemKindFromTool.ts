import { ToolKinds } from '@/redux/tools';
import { HistoryItemKinds } from '@/types/historyTypes';

export function getHistoryItemKindFromTool(
  toolKind: ToolKinds | null,
): HistoryItemKinds {
  switch (toolKind) {
    case ToolKinds.Brush:
      return HistoryItemKinds.Brush;
    case ToolKinds.Line:
      return HistoryItemKinds.Line;
    case ToolKinds.Rect:
      return HistoryItemKinds.Rect;
    case ToolKinds.Circle:
      return HistoryItemKinds.Circle;
    case ToolKinds.Eraser:
      return HistoryItemKinds.Eraser;
    case ToolKinds.Triangle:
      return HistoryItemKinds.Triangle;
    case ToolKinds.Move:
      return HistoryItemKinds.Move;
    default:
      return HistoryItemKinds.Brush;
  }
}
