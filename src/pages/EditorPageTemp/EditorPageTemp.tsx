import { HistoryMenu } from '@/components/HistoryMenu';
import { LayersMenu } from '@/components/LayersMenu';

export function EditorPageTemp() {
  return (
    <>
      <div className='fixed right-0 top-0 h-screen w-[300px] flex flex-col bg-slate-200'>
        <LayersMenu />
        <HistoryMenu />
      </div>
    </>
  );
}
