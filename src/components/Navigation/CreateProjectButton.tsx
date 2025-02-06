import { FC, memo, useCallback } from 'react';
import { useModal } from '@/hooks/useModal.tsx';
import {
  CreateProjectModal,
  ProjectFormData,
} from '@/components/CreateProjectModal';
import { Form } from 'antd';
import { getUid } from '@/utils/getUid.ts';
import { useNavigate } from 'react-router-dom';
import type { Project } from '@/types/localStorageTypes';
import { saveNewProjectToLS } from '@/utils/localStorageUtils';
import { FIRST_HISTORY_ITEM } from '@/utils/constants';

const CreateProjectButton1: FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const {
    open,
    onOpen,
    onClose,
  } = useModal();

  const handleSubmit = useCallback(
    (values: Omit<ProjectFormData, 'id'>) => {
      const id = getUid();
      const newProject: Project = {
        id,
        name: values.name,
        data: {
          historyItem: {
            ...FIRST_HISTORY_ITEM,
            width: +values.width,
            height: +values.height,
          },
          historyIdCount: 1,
          layerIdCount: 0,
        },
      };

      saveNewProjectToLS(newProject);

      form.resetFields();
      onClose();
      navigate(`/projects/${id}`, { state: newProject });
    },
    [form, onClose, navigate],
  );

  return (
    <>
      <button onClick={onOpen}>Новый проект</button>

      <CreateProjectModal
        open={open}
        onClose={onClose}
        form={form}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export const CreateProjectButton = memo(CreateProjectButton1);
