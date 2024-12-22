import { Link } from "react-router-dom";
import { DropDownNav, MenuItem } from "./DropDownNav";

export const Navigation = () => {
  const files: MenuItem[] = [
    {
      label: (
        <Link to={'/'}>
          Новый проект
        </Link>
      ),
      key: '0',
    },
    {
      label: (
        <Link to={'/'}>
          Сохранить
        </Link>
      ),
      key: '1',
    },
    {
      label: (
        <Link to={'/'}>
          Экспортировать
        </Link>
      ),
      key: '2',
    },
  ];
  const edits: MenuItem[] = [
    {
      label: (
        <Link to={'/'}>
          Отменить
        </Link>
      ),
      key: '0',
    },
    {
      label: (
        <Link to={'/'}>
          Вернуть
        </Link>
      ),
      key: '1',
    },
  ];

  return (
    <nav className='flex items-center gap-4 w-full border-b h-12 px-2'>
      <DropDownNav title={'Файл'} items={files} />
      <DropDownNav title={'Правка'} items={edits} />
      <Link to={'/projects'}>Все проекты</Link>
    </nav>
  )
}
