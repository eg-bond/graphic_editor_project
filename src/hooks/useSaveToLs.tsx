import { useAppSelector } from '@/redux/hooks';
import { Statuses } from '@/types/localStorageTypes';
import { addNewHistoryItemToLS } from '@/utils/localStorageUtils';
import { notification } from 'antd';

export const useSaveToLs = () => {
  const [api, contextHolder] = notification.useNotification();
  const historyState = useAppSelector(state => state.history);

  const handleSave = () => {
    const status = addNewHistoryItemToLS(historyState);
    if (status === Statuses.Error) {
      api['error']({
        message: 'Error',
        description: 'Не удалось сохранить',
      });
    } else {
      api['success']({
        message: 'Success',
        description: 'Успешно сохранено',
      });
    }
  };

  return { handleSave, notificationCtx: contextHolder };
};
