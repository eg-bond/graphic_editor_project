import { Link } from 'react-router-dom';
import { DropdownNav, MenuItem } from './DropDownNav';
import { CreateProjectButton } from '@/components/Navigation/CreateProjectButton.tsx';
import { useSaveProject } from '@/hooks/useSaveProject.tsx';
import { CanvasResolutionModal } from '@/components/CanvasResolution/CanvasResolutionModal';
import { useModal } from '@/hooks/useModal';
import { AuthStatus } from '../AuthStatus';
import { AppRoutes } from '@/types/appRoutes';
import { useExportDrawing } from '@/hooks/useExportDrawing';

export const Navigation = () => {
  const { exportDrawing } = useExportDrawing();
  const { handleSave, notificationCtx } = useSaveProject();
  const {
    open,
    onOpen,
    onClose,
  } = useModal();

  const items: MenuItem[] = [
    {
      label: <CreateProjectButton />,
      key: '0',
    },
    {
      label: <button onClick={() => handleSave()}>Сохранить</button>,
      key: '1',
    },
    {
      label: (
        <button onClick={exportDrawing}>
          Экспортировать
        </button>
      ),
      key: '2',
    },
    {
      label: (
        <button onClick={onOpen}>
          Изменить размер холста
        </button>
      ),
      key: '3',
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center w-full h-[5vh] border-b-2 border-b-cBlueDark">
        <nav className="flex items-center gap-4 px-2 text-white font-medium">
          <DropdownNav title="Файл" items={items} />
          <Link to={'/' + AppRoutes.Projects}>Все проекты</Link>
          {notificationCtx}
        </nav>
        <AuthStatus />
      </div>
      {open && (
        <CanvasResolutionModal open={open} onClose={onClose} />
      )}
    </>
  );
};
