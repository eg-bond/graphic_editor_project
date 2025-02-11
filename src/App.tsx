import '@/App.css';
import { Routing } from '@/components/Routing';
import { useAuthContext } from './context/AuthContext';
import { Flex, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

function App() {
  const { loading } = useAuthContext();

  if (loading) {
    return (
      <Flex
        style={{ height: '100vh' }}
        justify="center"
        align="center"
        gap="middle"
      >
        <Spin
          className="text-cBlue"
          indicator={<LoadingOutlined style={{ fontSize: 64 }} spin />}
        />
      </Flex>
    );
  }

  return (
    <div>
      <Routing />
    </div>
  );
}

export default App;
