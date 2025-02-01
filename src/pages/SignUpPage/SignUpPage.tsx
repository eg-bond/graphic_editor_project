import { useState } from 'react';
import { Form, Input, Button, Card, Row, Col, notification } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { SignUpFormValues } from '@/types/authTypes';
import { useAuthContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/types/appRoutes';
import { SignInNavBtn } from '@/components/Buttons';

export const SignUpPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuthContext();

  const onFinish = async (values: SignUpFormValues) => {
    try {
      setLoading(true);
      await signUp(values);
      notification.success({
        message: 'Успешная регистрация',
        description: 'Добро пожаловать на нашу платформу!',
      });
      navigate('/' + AppRoutes.Projects);
    } catch (error) {
      notification.error({
        message: 'Ошибка при регистрации',
        description: (error as Error).message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col
        xs={24}
        sm={20}
        md={16}
        lg={12}
        xl={8}
      >
        <Card title={<h2 className="text-center text-xl">Регистрация</h2>}>
          <Form
            form={form}
            name="signup"
            onFinish={onFinish}
            layout="vertical"
            initialValues={{ remember: true }}
            scrollToFirstError
          >
            <Form.Item
              name="nickname"
              rules={[{ required: true, message: 'Введите имя пользователя' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Имя пользователя"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Введите Email' },
                { type: 'email', message: 'Введите корректный Email' },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Email"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Введите пароль' },
                { min: 6, message: 'Пароль должен содержать минимум 6 символов' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Пароль"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Введите пароль' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Пароли не совпадают'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Подтвердите пароль"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                size="large"
              >
                Зарегистрироаться
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <div className="flex flex-col items-center mt-5">
          <p className="mb-2">
            Уже есть аккаунт?
          </p>
          <SignInNavBtn />
        </div>
      </Col>
    </Row>
  );
};
