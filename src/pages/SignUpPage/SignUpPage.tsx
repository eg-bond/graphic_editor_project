import { db, auth } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Form, Input, Button, Typography, Card, Row, Col, notification } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';

const { Title } = Typography;

export const SignUpPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
  }) => {
    try {
      setLoading(true);

      // Создаем пользователя в Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );

      // Сохраняем дополнительные данные в Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name: values.name,
        email: values.email,
        createdAt: new Date(),
      });

      notification.success({
        message: 'Registration Successful',
        description: 'Welcome to our platform!',
      });
      // TODO: Тут редирект сделать
    } catch (error) {
      notification.error({
        message: 'Registration Failed',
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
        <Card title={<Title level={2} style={{ textAlign: 'center' }}>Sign Up</Title>}>
          <Form
            form={form}
            name="signup"
            onFinish={onFinish}
            layout="vertical"
            initialValues={{ remember: true }}
            scrollToFirstError
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Full Name"
                size="large"
              />
            </Form.Item>

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
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 6, message: 'Password must be at least 6 characters!' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm Password"
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
                Register
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
