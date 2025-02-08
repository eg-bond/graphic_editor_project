import { Navigation } from '@/components/Navigation';
import { LayersMenu } from '@/components/LayersMenu';
import { HistoryMenu } from '@/components/HistoryMenu';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/redux/hooks.ts';
import { setProjectData } from '@/redux/history';
import { Canvas } from '@/components/Canvas';
import { Tools } from '@/components/Tools';
import { Flex, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { getProjectData } from '@/utils/firebaseUtils.ts';

export function EditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    (async () => {
      if (!id) {
        return;
      }

      try {
        const data = await getProjectData(id);
        if (data) {
          dispatch(setProjectData({ id: data.id, data: data.data }));
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        navigate('/404');
      }
      setInitialized(true);
    })();
  }, [dispatch, id, navigate]);

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
    <div className="h-screen w-full flex flex-col">
      {/* Top section */}
      <div className="h-[5vh] w-full">
        <Navigation />

      </div>

      {/* Main content area with right sidebar */}
      <div className="flex flex-1 relative">
        {/* Контейнер с инструментами и холстом */}
        <div className="flex-1 bg-gray-200 relative overflow-hidden">
          {/* Инструменты */}
          <Tools />

          {/* Голубой контейнер с холстом */}
          <div className="h-[95vh] bg-blue-300 flex justify-center items-center overflow-auto ">
            <div className="relative max-w-full max-h-full flex">
              <div className="p-4 pl-20 h-full">
                <Canvas />
              </div>
            </div>
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
