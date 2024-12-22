import { FC, memo, MouseEventHandler, useCallback, useState } from 'react';
import { Button, Card, Col, Form, Popconfirm, Row, Typography } from 'antd';
import { Gutter } from 'antd/es/grid/row';
import { getUid } from '@/utils/getUid.ts';
import { Link, useNavigate } from 'react-router-dom';
import { CreateProjectModal, Project } from '@/components/CreateProjectModal';

const PROJECTS_KEY = 'graphic-projects';

const stopPropagation: MouseEventHandler = e => e.stopPropagation();

const getInitialProjects = () => {
  const projects = localStorage.getItem(PROJECTS_KEY);
  return JSON.parse(projects ?? '[]') as Project[];
}

const gutter: [Gutter, Gutter] = [20, 20];

const MainPage1: FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [open, setOpen] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>(getInitialProjects);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleSubmit = useCallback((values: Omit<Project, 'id'>) => {
    setProjects(p => {
      const newProjects = [{ id: getUid(), height: +values.height, width: +values.width, name: values.name }, ...p];
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(newProjects));
      return newProjects;
    });

    form.resetFields();
    setOpen(false);
  }, [form]);

  const handleDelete = (id: string) => {
    setProjects(prevState => {
      const newProjects = prevState.filter(p => p.id !== id);
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(newProjects));
      return newProjects;
    });
  }

  return (
    <main className="max-w-[1500px] mx-auto mt-32">
      <div className={`flex ${projects.length ? 'justify-between' : 'items-center flex-col'} mb-8`}>
        <Typography.Title>
          {!projects.length ? 'Проекты отсутствуют' : 'Мои проекты'}
        </Typography.Title>
        <Button onClick={onOpen} className="!bg-green-500" type="primary" size="large">
          Новый проект
        </Button>
      </div>


      <Row gutter={gutter} wrap>
        {projects.map(project => (
          <Col span={6} key={project.id}>
            <Card onClick={() => navigate(`/projects/${project.id}`)} className="cursor-pointer">
              <Typography.Title level={2} className="!mb-12">
                {project.name}
              </Typography.Title>

              <div className="flex justify-between">
                <Link to={`/projects/${project.id}`}>
                  <Button color="primary" type="primary" size="large">
                    Открыть
                  </Button>
                </Link>


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

      <CreateProjectModal open={open} onClose={onClose} form={form} handleSubmit={handleSubmit} />
    </main>
  );
}

export const MainPage = memo(MainPage1);
