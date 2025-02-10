import { Typography, Button, Row, Col, Space } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useAuthContext } from '@/context/AuthContext';

const { Text } = Typography;

export const AuthStatus = () => {
  const { user, signOut } = useAuthContext();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Row justify="end" style={{ padding: '16px 24px' }}>
      <Col>
        <Space size="middle">
          {user && (
            <>
              <Text style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
                <Text strong>{user.email}</Text>
              </Text>
              <Button
                className="!bg-cRed hover:!bg-cRedHov font-medium"
                type="primary"
                danger
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                size="small"
              >
                Выйти
              </Button>
            </>
          )}
        </Space>
      </Col>
    </Row>
  );
};
