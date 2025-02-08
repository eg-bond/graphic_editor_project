import { useAppSelector } from '@/redux/hooks';
import { notification } from 'antd';
import { updateProjectData } from '@/utils/firebaseUtils.ts';

export const useSaveProject = () => {
  const [, contextHolder] = notification.useNotification();
  const historyState = useAppSelector(state => state.history);

  const handleSave = async () => {
    updateProjectData(historyState).then();
  };

  return { handleSave, notificationCtx: contextHolder };
};
