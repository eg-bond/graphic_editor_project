import { FC, memo, useCallback, useEffect, useState } from 'react';
import { Button, Form, notification, Row, Spin, Typography } from 'antd';
import { Gutter } from 'antd/es/grid/row';
import { useNavigate } from 'react-router-dom';
import { CreateProjectModal } from '@/components/CreateProjectModal';
import { useModal } from '@/hooks/useModal.tsx';
import { Project } from '@/types/localStorageTypes';
import { AuthStatus } from '@/components/AuthStatus';
import { useAuthContext } from '@/context/AuthContext';
import { deleteProject, getProjectsByUser } from '@/utils/firebaseUtils';
import { LoadingOutlined } from '@ant-design/icons';
import { ProjectCard } from '@/components/ProjectCard';

const gutter: [Gutter, Gutter] = [20, 20];

const ProjectsPage1: FC = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(true);
  const {
    open,
    onOpen,
    onClose,
  } = useModal();
  const [projects, setProjects] = useState<Project[]>([]);

  const handleSubmit = useCallback(async (project: Project) => {
    navigate(`/projects/${project.id}`);
  }, [navigate]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        if (!user) {
          return;
        }

        const projects = await getProjectsByUser(user.uid);
        setProjects(projects);
      } catch (e) {
        notification.error({
          message: 'Ошибка при загрузке проектов',
          description: (e as Error).message,
        });
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteProject(id);
      setProjects(prevState => prevState.filter(p => p.id !== id));
    } catch (e) {
      notification.error({
        message: 'Ошибка при удалении проекта',
        description: (e as Error).message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>

      <div className="w-full bg-cBlue">
        <AuthStatus />
      </div>
      <div className="max-w-[1500px] mx-auto mt-32 px-12">
        {loading && (
          <div className="flex justify-center">
            <Spin
              className="text-cBlue"
              indicator={<LoadingOutlined style={{ fontSize: 64 }} spin />}
            />
          </div>
        )}
        {!loading && (
          <>
            <div className={`flex ${projects.length ? 'justify-between' : 'items-center flex-col'} mb-8 `}>
              <Typography.Title className="!text-cBlueDark">
                {!projects.length ? 'Проекты отсутствуют' : 'Мои проекты'}
              </Typography.Title>
              <Button
                className="!bg-emerald-600 hover:!bg-emerald-700 font-medium"
                onClick={onOpen}
                type="primary"
                size="large"
              >
                Новый проект
              </Button>
            </div>

            <Row gutter={gutter} wrap>
              {projects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  setProjects={setProjects}
                  handleDelete={handleDelete}
                />
              ))}
            </Row>
          </>
        )}
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
