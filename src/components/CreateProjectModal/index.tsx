import { FC, memo } from 'react';
import { Button, Col, Form, Input, InputNumber, Modal, Row, Typography, FormInstance } from 'antd';
import { formatInteger } from '@/utils/formatInteger.ts';

export interface Project {
  id: string;
  name: string;
  width: number;
  height: number;
}

interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
  form: FormInstance<Project>;
  handleSubmit: (data: Omit<Project, 'id'>) => void;
}

const _CreateProjectModal: FC<CreateProjectModalProps> = ({ open, onClose, form, handleSubmit }) => {

  return (
    <Modal open={open} onCancel={onClose} footer={null} width={750} forceRender>
      <Typography.Title level={3}>
        Новый проект
      </Typography.Title>

      <Form<Project> layout="vertical" form={form} onFinish={handleSubmit}>
        <Row gutter={[20,20]}>
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
          <Button onClick={onClose} htmlType="submit" className="!bg-green-500" type="primary" size="large">
            Добавить
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export const CreateProjectModal = memo(_CreateProjectModal);
