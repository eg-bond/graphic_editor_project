import { FC, memo, useCallback } from 'react';
import { useModal } from '@/hooks/useModal.tsx';
import { CreateProjectModal, Project } from '@/components/CreateProjectModal';
import { Form } from 'antd';
import { PROJECTS_KEY } from '@/utils/constants.ts';
import { getUid } from '@/utils/getUid.ts';
import { useNavigate } from 'react-router-dom';

const CreateProjectButton1: FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { open, onOpen, onClose } = useModal();

  const handleSubmit = useCallback((values: Omit<Project, 'id'>) => {
    const projects = JSON.parse(localStorage.getItem(PROJECTS_KEY) ?? '[]');

    const id = getUid();
    const newProjects = [{ id, height: +values.height, width: +values.width, name: values.name }, ...projects];

    localStorage.setItem(PROJECTS_KEY, JSON.stringify(newProjects));

    form.resetFields();
    onClose();
    navigate(`/projects/${id}`);
  }, [form, onClose, navigate]);

  return (
    <>
      <button onClick={onOpen}>
        Новый проект
      </button>

      <CreateProjectModal open={open} onClose={onClose} form={form} handleSubmit={handleSubmit} />
    </>

  );
}

export const CreateProjectButton = memo(CreateProjectButton1);
