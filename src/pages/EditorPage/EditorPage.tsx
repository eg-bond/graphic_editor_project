import { Navigation } from '@/components/Navigation';
import { LayersMenu } from '@/components/LayersMenu';
import { HistoryMenu } from '@/components/HistoryMenu';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/redux/hooks.ts';
import { setProject } from '@/redux/project/projectSlice';
import { setProjectData } from '@/redux/history';
import { Canvas } from '@/components/Canvas';
import { getProjectsFromLS } from '@/utils/getProjectsFromLS';
import { Tools } from '@/components/Tools';
import { CanvasResolutionButton } from '@/components/CanvasResolution';
import { Flex, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export function EditorPage() {
  const { id } = useParams(); // Получаем id проекта из URL
  const dispatch = useAppDispatch();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (id) {
      const { currentProject } = getProjectsFromLS(id);

      if (currentProject) {
        // Загружаем проект в projectSlice
        dispatch(setProject(currentProject));

        // Загружаем данные для истории (если необходимо)
        dispatch(setProjectData({ id, data: currentProject?.data }));
      } else {
        console.error('Проект не найден!');
      }
    }
    setInitialized(true);
  }, [dispatch, id]);

  if (!initialized) {
    return (
      <Flex
        style={{ height: '100vh' }}
        justify="center"
        align="center"
        gap="middle"
      >
        <Spin indicator={<LoadingOutlined style={{ fontSize: 64 }} spin />} />
      </Flex>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col ">
      {/* Top section */}
      <div className="h-[5vh] w-full ">
        <Navigation />
      </div>

      {/* Main content area with right sidebar */}
      <div className="flex flex-1 ">
        <div className="flex-1 bg-gray-200 relative">
          <div>
            <Tools />
          </div>
          <div className="h-[95vh] bg-blue-300 flex justify-center items-start overflow-auto">
            <div className="m-auto">
              <Canvas />
            </div>

          </div>
          <CanvasResolutionButton />
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
