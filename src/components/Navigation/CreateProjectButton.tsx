import { FC, memo, useCallback } from 'react';
import { useModal } from '@/hooks/useModal.tsx';
import {
  CreateProjectModal,
  ProjectFormData,
} from '@/components/CreateProjectModal';
import { Form } from 'antd';
import { getUid } from '@/utils/getUid.ts';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/redux/hooks';
import { setProject } from '@/redux/project/projectSlice';
import type { Project } from '@/types/localStorageTypes';
import { saveNewProjectToLS } from '@/utils/localStorageUtils';

const CreateProjectButton1: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch(); // Подключаем диспетчер Redux
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
        height: +values.height,
        width: +values.width,
        name: values.name,
      };

      // Сохраняем проект в Redux
      dispatch(setProject(newProject));

      // Сохраняем проект в LocalStorage
      saveNewProjectToLS(newProject);

      // Сбрасываем форму, закрываем модал и переходим к редактору
      form.resetFields();
      onClose();
      navigate(`/projects/${id}`, { state: newProject });
    },
    [dispatch, form, onClose, navigate],
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
