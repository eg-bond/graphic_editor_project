import { EditorPage } from '@/pages/EditorPage';
import { AppRoutes } from '@/types/appRoutes';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from '@/pages/MainPage';
import { SignInPage } from '@/pages/SignInPage';
import { SignUpPage } from '@/pages/SignUpPage';

export function Routing() {
  return (
    <Routes>
      <Route path={AppRoutes.Main} element={<MainPage />} />
      <Route
        path={AppRoutes.Projects}
        element={<MainPage />}
      />
      <Route path={AppRoutes.CurrentProject} element={<EditorPage />} />
      <Route path={AppRoutes.SignIn} element={<SignInPage />} />
      <Route path={AppRoutes.SignUp} element={<SignUpPage />} />
    </Routes>
  );
}
