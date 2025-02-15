import { useAuthContext } from '@/context/AuthContext';
import { AppRoutes } from '@/types/appRoutes';
import { useNavigate } from 'react-router-dom';

export const SignInNavBtn = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleNavigateToSignIn = () => {
    if (user) {
      navigate('/' + AppRoutes.Projects);
    } else {
      navigate('/' + AppRoutes.SignIn);
    }
  };

  return (
    <button
      onClick={handleNavigateToSignIn}
      className={
        'px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 ' +
        'transition-colors duration-200 font-medium text-base min-w-[150px]'
      }
    >
      Вход
    </button>
  );
};
