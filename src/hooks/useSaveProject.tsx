import { useAppSelector } from '@/redux/hooks';
import { notification } from 'antd';
import { updateProjectData } from '@/utils/firebaseUtils.ts';
import { Statuses } from '@/types/localStorageTypes.ts';

export const useSaveProject = () => {
  const [, contextHolder] = notification.useNotification();
  const historyState = useAppSelector(state => state.history);

  const handleSave = async () => {
    const result = await updateProjectData(historyState);
    if (result === Statuses.Success) {
      notification.success({
        message: 'Успешно',
        description: 'Проект успешно сохранен',
      });
    }
  };

  return { handleSave, notificationCtx: contextHolder };
};
