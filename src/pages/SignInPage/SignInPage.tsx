import { useState } from 'react';
import { Form, Input, Button, Typography, Card, Row, Col, notification } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';

const { Title } = Typography;

export const SignInPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: {
    email: string; password: string;
  }) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, values.email, values.password);
      notification.success({
        message: 'Login Successful',
        description: 'Welcome back!',
      });
      // TODO: Редирект??
    } catch (error) {
      notification.error({
        message: 'Login Failed',
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
        <Card title={<Title level={2} style={{ textAlign: 'center' }}>Login</Title>}>
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
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
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
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
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
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
