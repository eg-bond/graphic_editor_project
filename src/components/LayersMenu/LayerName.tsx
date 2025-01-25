import { useAppDispatch } from '@/redux/hooks';
import { changeLayerName } from '@/redux/history';
import { LayerT } from '@/redux/history/historySlice';
import { Form, Input, InputRef } from 'antd';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { NEW_LAYER_NAME } from '@/utils/constants';

type ILayerName = {
  i: number;
  name: LayerT['name'];
  renameInputVisible: boolean;
  setRenameInputVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: () => void;
};

export function LayerName({
  i,
  name,
  renameInputVisible,
  setRenameInputVisible,
  onClick,
}: ILayerName) {
  const d = useAppDispatch();
  const inputRef = useRef<InputRef | null>(null);
  const [inputValue, setInputValue] = useState<string>(name);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (renameInputVisible) {
      setInputValue(name);
    }
  }, [renameInputVisible, name]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (error) setError(null);
  };

  const handleSubmit = () => {
    let trimmedName = inputValue.trim();

    if (trimmedName === '') {
      trimmedName = NEW_LAYER_NAME + String(i + 1);
    }

    d(changeLayerName({ index: i, name: trimmedName }));
    setRenameInputVisible(false);
  };

  return (
    <div className="flex-[0.75]" onClick={onClick}>
      {renameInputVisible && (
        <Form onFinish={handleSubmit}>
          <Input
            ref={inputRef}
            name="change_layer_name"
            type="text"
            maxLength={12}
            value={inputValue}
            onChange={handleChange}
            onBlur={handleSubmit}
            autoFocus
          />

          {error && <span className="text-red-500 text-sm">{error}</span>}
        </Form>
      )}

      {!renameInputVisible && <span>{name}</span>}
    </div>
  );
}
