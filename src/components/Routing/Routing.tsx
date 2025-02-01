import { EditorPage } from '@/pages/EditorPage';
import { AppRoutes } from '@/types/appRoutes';
import { Route, Routes } from 'react-router-dom';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { SignInPage } from '@/pages/SignInPage';
import { SignUpPage } from '@/pages/SignUpPage';
import { MainPage } from '@/pages/MainPage';
import { PrivateRoute } from '../PrivateRoute';
import { NotFoundPage } from '@/pages/NotFoundPage';

export function Routing() {
  return (
    <Routes>
      <Route path={AppRoutes.Main} element={<MainPage />} />
      <Route path={AppRoutes.SignIn} element={<SignInPage />} />
      <Route path={AppRoutes.SignUp} element={<SignUpPage />} />
      <Route path={AppRoutes.NotFound} element={<NotFoundPage />} />

      <Route
        path={AppRoutes.Projects}
        element={<PrivateRoute><ProjectsPage /></PrivateRoute>}
      />
      <Route
        path={AppRoutes.CurrentProject}
        element={<PrivateRoute><EditorPage /></PrivateRoute>}
      />
    </Routes>
  );
}
