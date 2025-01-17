import { Button, Tooltip } from 'antd';

interface ToolButtonProps {
  title: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

export const ToolButton: React.FC<ToolButtonProps> = ({
  title,
  icon,
  isSelected,
  onClick,
}) => (
  <Tooltip title={title} placement="right">
    <Button
      type="text"
      icon={icon}
      className={`hover:bg-gray-100 ${isSelected ? 'bg-gray-200' : ''}`}
      onClick={onClick}
    />
  </Tooltip>
);
