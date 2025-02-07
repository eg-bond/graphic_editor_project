import { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { changeLayerName } from '@/redux/history';
import { LayerT } from '@/redux/history/historySlice';
import { Form, Input } from 'antd';
import { NEW_LAYER_NAME } from '@/utils/constants';

type ILayerName = {
  index: number;
  name: LayerT['name'];
  renameInputVisible: boolean;
  setRenameInputVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: () => void;
};

export function LayerName({
  index,
  name,
  renameInputVisible,
  setRenameInputVisible,
  onClick,
}: ILayerName) {
  const d = useAppDispatch();
  const [inputValue, setInputValue] = useState<string>(name);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    const trimmedName = inputValue.trim() || `${NEW_LAYER_NAME}${index + 1}`;

    if (trimmedName === name) {
      setRenameInputVisible(false);
      return;
    }

    d(changeLayerName({ index, name: trimmedName }));
    setRenameInputVisible(false);
  };

  return (
    <div
      className="flex-[0.75]"
      onClick={onClick}
      onDoubleClick={() => {
        setRenameInputVisible(true);
      }}
    >
      {renameInputVisible && (
        <Form onFinish={handleSubmit}>
          <Input
            name="change_layer_name"
            type="text"
            maxLength={12}
            value={inputValue}
            onChange={handleChange}
            onBlur={handleSubmit}
            autoFocus
          />
        </Form>
      )}

      {!renameInputVisible && <span>{name}</span>}
    </div>
  );
}
