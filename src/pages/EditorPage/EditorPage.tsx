import { Navigation } from '@/components/Navigation';
import { LayersMenu } from '@/components/LayersMenu';
import { HistoryMenu } from '@/components/HistoryMenu';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/redux/hooks.ts';
import { setProjectData } from '@/redux/history';
import { Canvas } from '@/components/Canvas';
import { getProjectsFromLS } from '@/utils/getProjectsFromLS';
import { Tools } from '@/components/Tools';

export function EditorPage() {
  const location = useLocation();
  const project = location.state;
  const { id } = useParams();
  const d = useAppDispatch();
  // Redux state initialization
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (id) {
      const { currentProject } = getProjectsFromLS(id);
      d(setProjectData({ id, data: currentProject?.data }));
    }
    setInitialized(true);
  }, [d, id]);

  if (!project || !initialized) {
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
          <div>
            <Tools />
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
