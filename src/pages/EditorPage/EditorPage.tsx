import { Navigation } from '@/components/Navigation';
import { HistoryMenu } from '@/components/HistoryMenu';
import { LayersMenu } from '@/components/LayersMenu';

export function EditorPage() {
  return (
    <div className='h-screen w-full flex flex-col'>
      {/* Top section */}
      {/* <div className='h-[5vh] w-full bg-gray-300'>
        <h2 className='text-2xl'>Верхнее меню</h2>
        
      </div> */}
      <Navigation />

      {/* Main content area with right sidebar */}
      <div className='flex flex-1'>
        <div className='flex-1 bg-gray-200 relative'>
          <div className='h-[40vh] w-[5vw] m-4 bg-purple-500 absolute top-0 left-0'>
            <h2 className='text-2xl text-center'>Левое меню (Инструменты)</h2>
          </div>
          <div className='h-[95vh] bg-blue-300'>
            <h2 className='text-2xl text-center'>Основная часть</h2>
          </div>
        </div>

        {/* Right vertical menu */}
        <div className='w-1/6 bg-green-500'>
          {/* <div className='fixed right-0 top-0 h-screen w-[300px] flex flex-col bg-slate-200'> */}
          <LayersMenu />
          <HistoryMenu />
        </div>
      </div>
    </div>
  );
}
