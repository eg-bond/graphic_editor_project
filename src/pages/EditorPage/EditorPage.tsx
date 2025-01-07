import { Navigation } from '@/components/Navigation';
import { LayersMenu } from '@/components/LayersMenu';
import { HistoryMenu } from '@/components/HistoryMenu';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks.ts';
import { Project, setProjectData } from '@/redux/history';
import { PROJECTS_KEY } from '@/utils/constants.ts';
import { Canvas } from '@/components/Canvas';

export function EditorPage() {
  const location = useLocation();
  const project = location.state;
  const { id } = useParams();
  const d = useAppDispatch();

  useEffect(() => {
    if (id) {
      const allProjects = JSON.parse(localStorage.getItem(PROJECTS_KEY) ?? '[]');
      const currentProject: Project = allProjects.find((project: Project) => project.id === id);

      d(setProjectData({ id, data: currentProject?.data }));
    }
  }, [d, id]);

  if (!project) {
    return <p className="text-center mt-32">Проект не найден</p>;
  }

  return (
    <div className="h-screen w-full flex flex-col">
      {/* Top section */}
      <div className="h-[5vh] w-full">
        <Navigation />
      </div>

      {/* Main content area with right sidebar */}
      <div className="flex flex-1">
        <div className="flex-1 bg-gray-200 relative">
          <div className="h-[40vh] w-[5vw] m-4 bg-purple-500 absolute top-0 left-0">
            <h2 className="text-2xl text-center">Левое меню (Инструменты)</h2>
          </div>
          <div className="h-[95vh] bg-blue-300 flex justify-center items-center">
            <Canvas width={project.width} height={project.height} />
          </div>
        </div>

        {/* Right vertical menu */}
        <div className="w-1/6 h-[95vh] flex flex-col bg-slate-200">
          <LayersMenu />
          <HistoryMenu />
        </div>
      </div>
    </div>
  );
}
