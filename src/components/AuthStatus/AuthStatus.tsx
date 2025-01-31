import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { Spin, Typography, Button, Row, Col, Space } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { auth } from '@/firebase';

const { Text } = Typography;

export const AuthStatus = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      },
      (error) => {
        console.error('Auth state error:', error);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Row justify="end" style={{ padding: '16px 24px' }}>
      <Col>
        <Space size="middle">
          {loading
            ? (
                <Spin size="small" />
              )
            : user
              ? (
                  <>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
                      Welcome,
                      {' '}
                      <Text strong>{user.email}</Text>
                    </Text>
                    <Button
                      type="primary"
                      danger
                      icon={<LogoutOutlined />}
                      onClick={handleLogout}
                      size="small"
                    >
                      Logout
                    </Button>
                  </>
                )
              : (
                  <Text type="secondary">Not authenticated</Text>
                )}
        </Space>
      </Col>
    </Row>
  );
};
