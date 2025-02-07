import { HistoryItemKinds } from '@/types/historyTypes';

export function getHistoryItemName(action: HistoryItemKinds): string {
  switch (action) {
    case HistoryItemKinds.Add:
      return 'Новый слой';
    case HistoryItemKinds.Remove:
      return 'Удаление слоя';
    case HistoryItemKinds.Rename:
      return 'Имя слоя';
    case HistoryItemKinds.Opacity:
      return 'Непрозрачность';
    case HistoryItemKinds.Visibility:
      return 'Видимость слоя';
    case HistoryItemKinds.Order:
      return 'Порядок слоев';
    case HistoryItemKinds.Brush:
      return 'Кисть';
    case HistoryItemKinds.Line:
      return 'Линия';
    case HistoryItemKinds.Circle:
      return 'Круг';
    case HistoryItemKinds.Rect:
      return 'Квадрат';
    case HistoryItemKinds.Eraser:
      return 'Ластик';
    case HistoryItemKinds.Triangle:
      return 'Треугольник';
    case HistoryItemKinds.Move:
      return 'Перемещение';
    case HistoryItemKinds.OpenProject:
      return 'Открыть';
    case HistoryItemKinds.ResizeCanvas:
      return 'Размер холста';
    default:
      return '';
  }
}
