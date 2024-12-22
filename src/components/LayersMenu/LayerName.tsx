import { useAppDispatch } from '@/redux/hooks';
import { changeLayerName } from '@/redux/layers';
import { LayerT } from '@/redux/layers/layersSlice';
import { Form, Input } from 'antd';
import { ChangeEvent, FormEvent, useRef } from 'react';

type ILayerName = {
  id: LayerT['id'];
  name: LayerT['name'];
  renameInputVisible: boolean;
  setIsInputVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: () => void;
};

export function LayerName({
  id,
  name,
  renameInputVisible,
  setIsInputVisible,
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
    d(changeLayerName({ id, name: inputValue.current }));
    setIsInputVisible(false);
  };

  return (
    <div className='flex-[0.75]' onClick={onClick}>
      {/* Input for renaming layer */}
      {renameInputVisible && (
        <Form onSubmitCapture={handleSubmit} onChange={handleChange}>
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
