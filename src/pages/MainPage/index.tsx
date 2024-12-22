import { FC, memo, MouseEventHandler, useCallback, useState } from 'react';
import { Button, Card, Col, Form, Input, InputNumber, Modal, Popconfirm, Row, Typography } from 'antd';
import { Gutter } from 'antd/es/grid/row';
import { formatInteger } from '@/utils/formatInteger.ts';
import { getUid } from '@/utils/getUid.ts';
import { Link, useNavigate } from 'react-router-dom';

interface Project {
  id: string;
  name: string;
  width: number;
  height: number;
}

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

      <Modal open={open} onCancel={onClose} footer={null} width={750} forceRender>
        <Typography.Title level={3}>
          Новый проект
        </Typography.Title>

        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Row gutter={gutter}>
            <Col span={8}>
              <Form.Item
                name="name"
                required
                rules={[{ required: true, message: 'Это поле обязательно' }]}
                label="Название"
              >
                <Input placeholder="Введите название" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="width"
                required
                rules={[
                  { required: true, message: 'Это поле обязательно' },
                  { min: 1, type: 'number', transform: v => +v, message: 'Минимальное значение 1 px', },
                  { max: 5000, type: 'number', transform: v => +v, message: 'Максимальное значение 5000 px', }
                ]}
                label="Ширина"
                normalize={formatInteger}
              >
                <InputNumber placeholder="px" type="number" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="height"
                required
                rules={[
                  { required: true, message: 'Это поле обязательно' },
                  { min: 1, type: 'number', transform: v => +v, message: 'Минимальное значение 1 px', },
                  { max: 5000, type: 'number', transform: v => +v, message: 'Максимальное значение 5000 px', }
                ]}
                label="Высота"
                normalize={formatInteger}
              >
                <InputNumber placeholder="px" type="number" />
              </Form.Item>
            </Col>
          </Row>

          <div className="flex justify-end">
            <Button onClick={onOpen} htmlType="submit" className="!bg-green-500" type="primary" size="large">
              Добавить
            </Button>
          </div>

        </Form>
      </Modal>
    </main>
  );
}

export const MainPage = memo(MainPage1);
