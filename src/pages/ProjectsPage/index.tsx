import { FC, memo, MouseEventHandler, useCallback, useState } from 'react';
import { Button, Card, Col, Form, notification, Popconfirm, Row, Typography } from 'antd';
import { Gutter } from 'antd/es/grid/row';
import { getUid } from '@/utils/getUid.ts';
import { useNavigate } from 'react-router-dom';
import {
  CreateProjectModal,
  ProjectFormData,
} from '@/components/CreateProjectModal';
import { useModal } from '@/hooks/useModal.tsx';
import { FIRST_HISTORY_ITEM, PROJECTS_KEY } from '@/utils/constants.ts';
import { Project } from '@/types/localStorageTypes';
import { getProjectsFromLS, saveNewProjectToLS } from '@/utils/localStorageUtils';
import { AuthStatus } from '@/components/AuthStatus';
import { useAuthContext } from '@/context/AuthContext';
import { createProject } from '@/utils/firebaseUtils';

const stopPropagation: MouseEventHandler = e => e.stopPropagation();

const { allProjects } = getProjectsFromLS();

const gutter: [Gutter, Gutter] = [20, 20];

const ProjectsPage1: FC = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const {
    open,
    onOpen,
    onClose,
  } = useModal();
  const [projects, setProjects] = useState<Project[]>(allProjects);

  const handleSubmit = useCallback(async (values: ProjectFormData) => {
    if (!user) return;

    // Сохранение проекта в LS (убрать)
    // в firebase каждый новый документ получает свой уникальный id, думаю можно его использовать вместо getUid()
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
    setProjects(prevProjects => [{ ...newProject }, ...prevProjects]);

    // Сохранение проекта в Firebase (проверял работоспособность, решил уже оставить тут)
    // try {
    //   await createProject({
    //     name: values.name,
    //   }, user.uid);

    //   form.resetFields();
    //   onClose();
    // } catch (error) {
    //   notification.error({
    //     message: 'Ошибка при создании проекта',
    //     description: (error as Error).message,
    //   });
    // }

    // form.resetFields();
    // onClose();
  }, [form, user, onClose]);

  const handleDelete = (id: string) => {
    setProjects((prevState) => {
      const newProjects = prevState.filter(p => p.id !== id);
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(newProjects));
      return newProjects;
    });
  };

  return (
    <main>
      <AuthStatus />
      <div className="max-w-[1500px] mx-auto mt-32">
        <div
          className={`flex ${
            projects.length ? 'justify-between' : 'items-center flex-col'
          } mb-8`}
        >
          <Typography.Title>
            {!projects.length ? 'Проекты отсутствуют' : 'Мои проекты'}
          </Typography.Title>
          <Button
            onClick={onOpen}
            className="!bg-green-500"
            type="primary"
            size="large"
          >
            Новый проект
          </Button>
        </div>

        <Row gutter={gutter} wrap>
          {projects.map(project => (
            <Col span={6} key={project.id}>
              <Card
                onClick={() =>
                  navigate(`/projects/${project.id}`, { state: project })}
                className="cursor-pointer"
              >
                <Typography.Title level={2} className="!mb-12">
                  {project.name}
                </Typography.Title>

                <div className="flex justify-between">
                  <Button
                    color="primary"
                    type="primary"
                    size="large"
                    onClick={() =>
                      navigate(`/projects/${project.id}`, { state: project })}
                  >
                    Открыть
                  </Button>

                  <div onClick={stopPropagation}>
                    <Popconfirm
                      title="Удалить проект"
                      description="Вы уверены, что хотите удалить проект?"
                      okText="Удалить"
                      cancelText="Отмена"
                      onConfirm={() => handleDelete(project.id)}
                    >
                      <Button danger size="large">
                        Удалить
                      </Button>
                    </Popconfirm>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <CreateProjectModal
          open={open}
          onClose={onClose}
          form={form}
          handleSubmit={handleSubmit}
        />
      </div>
    </main>
  );
};

export const ProjectsPage = memo(ProjectsPage1);
