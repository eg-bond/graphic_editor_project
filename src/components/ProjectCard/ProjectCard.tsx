import { Project } from '@/types/localStorageTypes';
import { Styles } from '@/types/themeTypes';
import { animationDelay } from '@/utils/animationDelay';
import { EditOutlined } from '@ant-design/icons';
import { Button, Card, Col, Input, Popconfirm, Typography } from 'antd';
import { ChangeEvent, MouseEventHandler, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';

interface IProjectCard {
  project: Project;
  index: number;
  handleDelete: (id: string) => Promise<void>;
}

const stopPropagation: MouseEventHandler = e => e.stopPropagation();

export const ProjectCard = ({
  project,
  index,
  handleDelete,
}: IProjectCard) => {
  const navigate = useNavigate();
  // const [inputValue, setInputValue] = useState(project.name);
  // const [renameInputVisible, setRenameInputVisible] = useState(false);

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(e.target.value);
  // };

  // const handleSubmit = () => {
  //   const trimmedName = inputValue.trim() || 'Без названия';

  //   if (trimmedName === project.name) {
  //     setRenameInputVisible(false);
  //     return;
  //   }
  //   // save
  //   setRenameInputVisible(false);

  // };

  return (
    <Col
      xs={24}
      sm={12}
      lg={8}
      xl={6}
    >
      <div
        className="opacity-0 animate-fadeInDown"
        style={{ animationDelay: animationDelay(0.1, index) }}
      >
        <Card className="cursor-pointer border border-slate-400 relative">
          <img
            className="absolute left-0 bottom-0 h-full w-full"
            src="bg-card-4.png"
            alt=""
          />
          <div className="flex justify-between gap-4">
            {/* <div>
              {renameInputVisible && (
                <Form onFinish={handleSubmit}>
                  <Input
                    name="change_project_name"
                    type="text"
                    maxLength={16}
                    value={inputValue}
                    onChange={handleChange}
                    onBlur={handleSubmit}
                    autoFocus
                  />
                </Form>
              )}

              {!renameInputVisible && (
                <Typography.Title level={2} className="!mb-12 !text-cBlueDark">
                  {project.name}
                </Typography.Title>
              )}
            </div> */}

            <Typography.Title level={2} className="!mb-12 !text-cBlueDark">
              {project.name}
            </Typography.Title>

            <span
              className="align-top mt-[2px] z-[150]"
            >
              <EditOutlined style={{ fontSize: '32px', color: Styles.BlueDark }} />
            </span>
          </div>

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
              Открыть
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
  );
};
