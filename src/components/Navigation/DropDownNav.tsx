import { Dropdown, MenuProps, Space } from "antd";
export interface MenuItem {
  key: string;
  label: React.ReactNode;
}

export interface MyMenuProps extends MenuProps {
  title: string;
  items: MenuItem[];
}

export const DropDownNav = ({ title, items }: MyMenuProps) => {

  return (
    <Dropdown menu={{ items }}>
      <Space>{title}</Space>
    </Dropdown>
  )
}
