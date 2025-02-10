import { useState } from 'react';
import { Form, Input, Button, Card, Row, Col, notification } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useAuthContext } from '@/context/AuthContext';
import { SignInFormValues } from '@/types/authTypes';
import { SignUpNavBtn } from '@/components/Buttons';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/types/appRoutes';

export const SignInPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuthContext();

  const onFinish = async (values: SignInFormValues) => {
    try {
      setLoading(true);
      await signIn(values);
      notification.success({
        message: 'Успешный вход в систему',
        description: 'Добро пожаловать!',
      });
      navigate('/' + AppRoutes.Projects);
    } catch (error) {
      notification.error({
        message: 'Ошибка при входе в систему',
        description: (error as Error).message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <img className="w-screen h-screen absolute bg-contain blur-md opacity-80" src="bg-1.png" alt="" />
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col
          xs={24}
          sm={20}
          md={16}
          lg={12}
          xl={8}
        >
          <Card title={<h2 className="text-center text-2xl">Вход</h2>}>
            <Form
              form={form}
              name="login"
              onFinish={onFinish}
              layout="vertical"
              initialValues={{ remember: true }}
            >
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
                rules={[{ required: true, message: 'Введите пароль' }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Пароль"
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
                  Войти
                </Button>
              </Form.Item>
            </Form>
          </Card>

          <div className="flex flex-col items-center mt-5">
            <p className="mb-2 text-base">
              Нет аккаунта в системе?
            </p>
            <SignUpNavBtn />
          </div>
        </Col>
      </Row>
    </>
  );
};
