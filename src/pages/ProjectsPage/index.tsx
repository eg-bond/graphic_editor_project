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
import { animationDelay } from '@/utils/animationDelay';

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

      <div className="w-full bg-cBlue">
        <AuthStatus />
      </div>
      <div className="max-w-[1500px] mx-auto mt-32 px-12">
        {loading && (
          <div className="flex justify-center">
            <Spin className="text-cBlue" indicator={<LoadingOutlined style={{ fontSize: 64 }} spin />} />
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
                <Col
                  xs={24}
                  sm={12}
                  lg={8}
                  xl={6}
                  key={project.id}
                >
                  <div
                    className="opacity-0 animate-fadeInDown"
                    style={{ animationDelay: animationDelay(0.1, i) }}
                  >
                    <Card
                      onClick={() =>
                        navigate(`/projects/${project.id}`, { state: project })}
                      className="cursor-pointer border border-slate-400 relative"
                    >
                      <img className="absolute left-0 bottom-0 h-full w-full" src="bg-card-4.png" alt="" />
                      <Typography.Title level={2} className="!mb-12 !text-cBlueDark">
                        {project.name}
                      </Typography.Title>

                      <div className="flex justify-between gap-4">
                        <Button
                          onClick={() =>
                            navigate(`/projects/${project.id}`, { state: project })}
                          className={
                            'w-[100px] text-white font-medium border-none ' +
                            '!bg-cBlue hover:!bg-cBlueDark !text-white'
                          }
                          size="large"
                        >
                          Вход
                        </Button>

                        <div className="w-[100px] z-20" onClick={stopPropagation}>
                          <Popconfirm
                            title="Удалить проект"
                            description="Вы уверены, что хотите удалить проект?"
                            okText="Удалить"
                            cancelText="Отмена"
                            onConfirm={() => handleDelete(project.id)}
                            cancelButtonProps={{
                              className: 'cBtn ',
                            }}
                            okButtonProps={{
                              className: '!bg-cRed hover:!bg-cRedDark',
                            }}
                          >
                            <Button
                              className={
                                'w-full text-white font-medium border-none ' +
                                '!bg-cRed hover:!bg-cRedDark !text-white'
                              }
                              size="large"
                            >
                              Удалить
                            </Button>
                          </Popconfirm>
                        </div>
                      </div>
                    </Card>
                  </div>
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
