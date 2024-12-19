import { Button, Divider, MenuProps, Slider } from 'antd';
import { Dropdown } from 'antd';

const items: MenuProps['items'] = [
  {
    label: 'Переименовать',
    key: '1',
  },
  {
    label: 'Удалить',
    key: '2',
  },
];

export function LayersMenu() {
  return (
    <div className='h-1/2 border-b border-gray-300 '>
      <h1>Layers Menu</h1>
      <Divider className='m-0' />
      <button>Add layer</button>
      <h2>Прозрачность</h2>
      <Divider className='m-0' />
      <Slider />
      <div className='layers'>
        <div className='flex flex-col justify-between'>
          <div>
            <span>Слой 1</span>
            <button>Скрыть</button>
            <Dropdown
              menu={{ items }}
              placement='bottomLeft'
              trigger={['click']}>
              <Button>...</Button>
            </Dropdown>
          </div>
          <div>
            <span>Слой 2</span>
            <button>Скрыть</button>
            <Dropdown
              menu={{ items }}
              placement='bottomLeft'
              trigger={['click']}>
              <Button>...</Button>
            </Dropdown>
          </div>
          <div>
            <span>Слой 3</span>
            <button>Скрыть</button>
            <Dropdown
              menu={{ items }}
              placement='bottomLeft'
              trigger={['click']}>
              <Button>...</Button>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
}
