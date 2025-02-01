import { Link } from 'react-router-dom';
import { DropDownNav, MenuItem } from './DropDownNav';
import { CreateProjectButton } from '@/components/Navigation/CreateProjectButton.tsx';
import { useSaveToLs } from '@/hooks/useSaveToLs';
import { CanvasResolutionModal } from '@/components/CanvasResolution/CanvasResolutionModal';
import { useModal } from '@/hooks/useModal';
import { AuthStatus } from '../AuthStatus';
import { AppRoutes } from '@/types/appRoutes';

export const Navigation = () => {
  const { handleSave, notificationCtx } = useSaveToLs();
  const {
    open,
    onOpen,
    onClose,
  } = useModal();

  const files: MenuItem[] = [
    {
      label: <CreateProjectButton />,
      key: '0',
    },
    {
      label: <button onClick={() => handleSave()}>Сохранить</button>,
      key: '1',
    },
    {
      label: <Link to="/">Экспортировать</Link>,
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
      <div className="flex justify-between items-center w-full">
        <nav className="flex items-center gap-4 h-full px-2 ">
          <DropDownNav title="Файл" items={files} />
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
