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

  const classes =
  'px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 ' +
  'transition-colors duration-200 font-medium min-w-[150px]';

  return (
    <button
      onClick={handleNavigateToSignIn}
      className={classes}
    >
      Вход
    </button>
  );
};
