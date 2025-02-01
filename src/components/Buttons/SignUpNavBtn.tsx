import { AppRoutes } from '@/types/appRoutes';
import { useNavigate } from 'react-router-dom';

export const SignUpNavBtn = () => {
  const navigate = useNavigate();

  const handleNavigateToSignUp = () => {
    navigate('/' + AppRoutes.SignUp);
  };

  return (
    <button
      onClick={handleNavigateToSignUp}
      className={
        'px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ' +
        'transition-colors duration-200 font-medium min-w-[150px]'
      }
    >
      Регистрация
    </button>
  );
};
