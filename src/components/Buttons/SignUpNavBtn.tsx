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
        'px-8 py-3 bg-cBlue text-white rounded-lg hover:bg-cBlueHov ' +
        'transition-colors duration-200 font-medium text-base min-w-[150px]'
      }
    >
      Регистрация
    </button>
  );
};
