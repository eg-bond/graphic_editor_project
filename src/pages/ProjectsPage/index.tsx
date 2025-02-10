import { FC, memo, MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { Button, Card, Col, Form, notification, Popconfirm, Row, Spin, Typography } from 'antd';
import { Gutter } from 'antd/es/grid/row';
import { useNavigate } from 'react-router-dom';
import { CreateProjectModal } from '@/components/CreateProjectModal';
import { useModal } from '@/hooks/useModal.tsx';
import { Project } from '@/types/localStorageTypes';
import { AuthStatus } from '@/components/AuthStatus';
import { useAuthContext } from '@/context/AuthContext';
import { deleteProject, getProjectsByUser } from '@/utils/firebaseUtils';
import { LoadingOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const stopPropagation: MouseEventHandler = e => e.stopPropagation();

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
      <AuthStatus />
      <div className="max-w-[1500px] mx-auto mt-32">
        {loading
          ? (
              <div className="flex justify-center">
                <Spin indicator={<LoadingOutlined style={{ fontSize: 64 }} spin />} />
              </div>
            )
          : (
              <>
                <div className={`flex ${projects.length ? 'justify-between' : 'items-center flex-col'} mb-8 `}>
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
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Card
                          onClick={() =>
                            navigate(`/projects/${project.id}`, { state: project })}
                          className="cursor-pointer border border-slate-400 relative"
                        >
                          <img className="absolute left-0 bottom-0 h-full w-full" src="bg-card-4.png" alt="" />
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
                      </motion.div>
                    </Col>
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
