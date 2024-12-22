import { useAppDispatch } from '@/redux/hooks';
import { changeLayerName } from '@/redux/layers';
import { LayerT } from '@/redux/layers/layersSlice';
import { Form, Input } from 'antd';
import { ChangeEvent, FocusEventHandler, FormEvent, useRef } from 'react';

type EventsTypes = ChangeEvent<HTMLInputElement> &
  FormEvent<HTMLFormElement> &
  FocusEventHandler<HTMLInputElement>;

type ILayerName = {
  id: LayerT['id'];
  name: LayerT['name'];
  isInputVisible: boolean;
  setIsInputVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: () => void;
};

export function LayerName({
  id,
  name,
  isInputVisible,
  setIsInputVisible,
  onClick,
}: ILayerName) {
  const d = useAppDispatch();
  const inputValue = useRef('');

  const handleChange = (e: EventsTypes) => {
    inputValue.current = e.target.value;
  };

  const handleSubmit = (e: EventsTypes) => {
    e.preventDefault();
    d(changeLayerName({ id, name: inputValue.current }));
    setIsInputVisible(false);
  };

  return (
    <div className='flex-[0.75]' onClick={onClick}>
      {isInputVisible && (
        <Form onSubmitCapture={handleSubmit} onChange={handleChange}>
          <Input
            name='change_layer_name'
            type='text'
            maxLength={12}
            //@ts-expect-error: don't know how to type the right way
            onBlur={handleSubmit}
            autoFocus
          />
        </Form>
      )}
      {!isInputVisible && <span>{name}</span>}
    </div>
  );
}
