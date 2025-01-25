import { Link } from 'react-router-dom';
import { DropDownNav, MenuItem } from './DropDownNav';
import { CreateProjectButton } from '@/components/Navigation/CreateProjectButton.tsx';
import { useSaveToLs } from '@/hooks/useSaveToLs';
import { CanvasResolutionModal } from '@/components/CanvasResolution/CanvasResolutionModal';
import { useModal } from '@/hooks/useModal';

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

  const edits: MenuItem[] = [
    {
      label: <Link to="/">Отменить</Link>,
      key: '0',
    },
    {
      label: <Link to="/">Вернуть</Link>,
      key: '1',
    },
  ];

  return (
    <>
      <nav className="flex items-center gap-4 w-full border-b h-full px-2">
        <DropDownNav title="Файл" items={files} />
        <DropDownNav title="Правка" items={edits} />
        <Link to="/">Все проекты</Link>
        {notificationCtx}
      </nav>
      {open && (
        <CanvasResolutionModal open={open} onClose={onClose} />
      )}
    </>
  );
};
