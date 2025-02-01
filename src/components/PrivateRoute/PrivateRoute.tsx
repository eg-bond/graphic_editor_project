import { ReactNode, useEffect } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/types/appRoutes';

interface IPrivateRoute {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: IPrivateRoute) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate('/' + AppRoutes.SignIn);
    }
  }, [user, navigate]);

  if (user === null) {
    return null;
  }

  return children;
};
