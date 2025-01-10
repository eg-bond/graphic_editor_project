import { useAppDispatch } from '@/redux/hooks';
import { changeLayerName } from '@/redux/history';
import { LayerT } from '@/redux/history/historySlice';
import { Form, Input } from 'antd';
import React, { ChangeEvent, FormEvent, useRef } from 'react';

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
  const inputValue = useRef('');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> & FormEvent<HTMLFormElement>
  ) => {
    inputValue.current = e.target.value;
  };

  const handleSubmit = () => {
    d(changeLayerName({ index: i, name: inputValue.current }));
    setRenameInputVisible(false);
  };

  return (
    <div className='flex-[0.75]' onClick={onClick}>
      {/* Input for renaming layer */}
      {renameInputVisible && (
        <Form onFinish={handleSubmit} onChange={handleChange}>
          <Input
            name='change_layer_name'
            type='text'
            maxLength={12}
            onBlur={handleSubmit}
            autoFocus
          />
        </Form>
      )}
      {/* Current layer name */}
      {!renameInputVisible && <span>{name}</span>}
    </div>
  );
}
