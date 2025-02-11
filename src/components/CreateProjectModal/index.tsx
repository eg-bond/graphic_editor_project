import { FC, memo, useCallback, useState } from 'react';
import { Button, Col, Form, FormInstance, Input, InputNumber, Modal, notification, Row, Typography } from 'antd';
import { allowOnlyNumbers } from '@/utils/formatInteger.ts';
import { FIRST_HISTORY_ITEM, WIDTH_AND_HEIGHT_VALIDATION_RULES } from '@/utils/constants';
import type { Project } from '@/types/localStorageTypes.ts';
import { createProject } from '@/utils/firebaseUtils.ts';
import { useAuthContext } from '@/context/AuthContext.tsx';

export interface ProjectFormData {
  name: string;
  width: number;
  height: number;
}

interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
  form: FormInstance<ProjectFormData>;
  handleSubmit: (data: Project) => void;
}

const CreateProjectModal1: FC<CreateProjectModalProps> = ({
  open,
  onClose,
  form,
  handleSubmit,
}) => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = useCallback(async (values: ProjectFormData) => {
    if (!user) return;

    try {
      setLoading(true);

      const newProject: Omit<Project, 'id'> = {
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

      const id = await createProject(newProject, user.uid);

      form.resetFields();
      onClose();
      handleSubmit?.({ id, ...newProject });
    } catch (error) {
      notification.error({
        message: 'Ошибка при создании проекта',
        description: (error as Error).message,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <Modal
      open={open}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      loading={loading}
      footer={null}
      width={750}
      forceRender
    >
      <Typography.Title level={3}>
        Новый проект
      </Typography.Title>

      <Form<ProjectFormData>
        layout="vertical"
        form={form}
        onFinish={onSubmit}
      >
        <Row gutter={[20, 20]}>
          <Col span={8}>
            <Form.Item
              name="name"
              rules={[{
                required: true,
                message: 'Это поле обязательно',
              }]}
              label="Название"
            >
              <Input placeholder="Введите название" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="width"
              rules={WIDTH_AND_HEIGHT_VALIDATION_RULES}
              label="Ширина"
            >
              <InputNumber
                placeholder="Введите ширину"
                type="number"
                onKeyDown={allowOnlyNumbers}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="height"
              rules={WIDTH_AND_HEIGHT_VALIDATION_RULES}
              label="Высота"
            >
              <InputNumber
                placeholder="Введите высоту"
                type="number"
                onKeyDown={allowOnlyNumbers}
              />
            </Form.Item>
          </Col>
        </Row>

        <div className="flex justify-end">
          <Button
            className="!bg-emerald-600 hover:!bg-emerald-700 font-medium"
            htmlType="submit"
            type="primary"
            size="large"
          >
            Добавить
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export const CreateProjectModal = memo(CreateProjectModal1);
