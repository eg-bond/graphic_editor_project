import { HistoryItemKinds } from '@/types/historyTypes';

export function getHistoryItemName(action: HistoryItemKinds): string {
  switch (action) {
    case HistoryItemKinds.Add:
      return 'Новый слой';
    case HistoryItemKinds.Remove:
      return 'Удаление слоя';
    case HistoryItemKinds.Rename:
      return 'Переименование слоя';
    case HistoryItemKinds.Opacity:
      return 'Непрозрачность слоя';
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
    default:
      return '';
  }
}
