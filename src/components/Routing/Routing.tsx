import { EditorPage } from '@/pages/EditorPage';
import { AppRoutes } from '@/types/appRoutes';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from '@/pages/MainPage';

export function Routing() {
  return (
    <Routes>
      <Route path={AppRoutes.Main} element={<MainPage />} />
      <Route
        path={AppRoutes.Projects}
        element={<h1 className='text-4xl'>Projects Page</h1>}
      />
      <Route path={AppRoutes.CurrentProject} element={<EditorPage />} />
    </Routes>
  );
}
