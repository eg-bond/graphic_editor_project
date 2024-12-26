import { LayerHistoryActions } from '@/types/historyTypes';

export function getHistoryName(action: LayerHistoryActions): string {
  switch (action) {
    case LayerHistoryActions.Add:
      return 'Новый слой';
    case LayerHistoryActions.Remove:
      return 'Удаление слоя';
    case LayerHistoryActions.Rename:
      return 'Переименование слоя';
    case LayerHistoryActions.ChangeOpacity:
      return 'Непрозрачность слоя';
    case LayerHistoryActions.ChangeVisibility:
      return 'Видимость слоя';
    case LayerHistoryActions.ChangeOrder:
      return 'Порядок слоев';
    default:
      return '';
  }
}
