import { useAppSelector } from '@/redux/hooks';
import { notification } from 'antd';
import { updateProjectData } from '@/utils/firebaseUtils.ts';
import { Statuses } from '@/types/localStorageTypes.ts';
import { useCallback, useEffect, useState } from 'react';
import { debounce } from '@/utils/debounce';

export const useSaveProject = () => {
  const historyState = useAppSelector(state => state.history);
  const [, contextHolder] = notification.useNotification();
  const [isSaving, setIsSaving] = useState(false);

  const updateProjectDataDebounced = useCallback(debounce((state) => {
    setIsSaving(true);
    updateProjectData(state).finally(() => setIsSaving(false));
  }, 2000), []);

  useEffect(() => {
    updateProjectDataDebounced(historyState);
  }, [historyState, updateProjectDataDebounced]);

  const handleSave = async () => {
    const result = await updateProjectData(historyState);
    if (result === Statuses.Success) {
      notification.success({
        message: 'Успешно',
        description: 'Проект успешно сохранен',
      });
    }
  };

  return { handleSave, isSaving, notificationCtx: contextHolder };
};
