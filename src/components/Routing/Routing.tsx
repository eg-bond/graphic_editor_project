import { EditorPage } from '@/pages/EditorPage';
import { AppRoutes } from '@/types/appRoutes';
import { Route, Routes } from 'react-router-dom';

export function Routing() {
  return (
      <Routes>
        <Route
          path={AppRoutes.Main}
          element={<h1 className='text-4xl'>Main Page</h1>}
        />
        <Route
          path={AppRoutes.Projects}
          element={<h1 className='text-4xl'>Projects Page</h1>}
        />
        <Route path={AppRoutes.CurrentProject} element={<EditorPage />} />
      </Routes>
  );
}
