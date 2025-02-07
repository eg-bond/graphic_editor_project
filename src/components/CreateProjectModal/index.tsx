import { FC, memo } from 'react';
import {
  Button, Col, Form, Input, InputNumber,
  Modal, Row, Typography, FormInstance,
} from 'antd';
import { allowOnlyNumbers } from '@/utils/formatInteger.ts';
import { WIDTH_AND_HEIGHT_VALIDATION_RULES } from '@/utils/constants';

export interface ProjectFormData {
  name: string;
  width: number;
  height: number;
}

interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
  form: FormInstance<ProjectFormData>;
  handleSubmit: (data: ProjectFormData) => void;
}

const _CreateProjectModal: FC<CreateProjectModalProps> = ({
  open,
  onClose,
  form,
  handleSubmit,
}) => {
  const onClick = async () => {
    try {
      await form.validateFields();
      onClose();
    } catch (error) {
      console.error('Error while creating project:', error);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
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
        onFinish={handleSubmit}
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
            onClick={onClick}
            htmlType="submit"
            className="!bg-green-500"
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

export const CreateProjectModal = memo(_CreateProjectModal);
