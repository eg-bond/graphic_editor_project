import { FC, memo, useCallback } from 'react';
import { useModal } from '@/hooks/useModal.tsx';
import { CreateProjectModal } from '@/components/CreateProjectModal';
import { Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { Project } from '@/types/localStorageTypes';

const CreateProjectButton1: FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const {
    open,
    onOpen,
    onClose,
  } = useModal();

  const handleSubmit = useCallback(async (project: Project) => {
    navigate(`/projects/${project.id}`);
  }, [navigate]);

  return (
    <div>
      <button onClick={() => {
        console.log('uuus');
        onOpen();
      }}
      >
        Новый проект
      </button>

      <CreateProjectModal
        open={open}
        onClose={onClose}
        form={form}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export const CreateProjectButton = memo(CreateProjectButton1);
