import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Result
        status="404"
        title="404"
        subTitle="К сожалению такой страницы нет."
        extra={(
          <Button
            type="primary"
            onClick={handleBackHome}
            className="bg-blue-600 hover:bg-blue-700"
          >
            На главную
          </Button>
        )}
        className="text-center"
      />
    </div>
  );
};
