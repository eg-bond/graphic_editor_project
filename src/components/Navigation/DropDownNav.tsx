import { ReactNode } from 'react';
import { Dropdown, MenuProps, Space } from "antd";
export interface MenuItem {
  key: string;
  label: ReactNode;
}

export interface MyMenuProps extends MenuProps {
  title: string;
  items: MenuItem[];
}

export const DropDownNav = ({ title, items }: MyMenuProps) => {

  return (
    <Dropdown menu={{ items }} className="cursor-pointer">
      <Space>{title}</Space>
    </Dropdown>
  )
}
