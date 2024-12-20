import { useAppDispatch } from '@/redux/hooks';
import { activateLayer, changeLayerName } from '@/redux/layers';
import { LayerT } from '@/redux/layers/layersSlice';
import { Button } from 'antd';
import { ChangeEvent, FormEvent, useRef } from 'react';

type ILayerName = {
  id: LayerT['id'];
  name: LayerT['name'];
  isInputVisible: boolean;
  setIsInputVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LayerName({
  id,
  name,
  isInputVisible,
  setIsInputVisible,
}: ILayerName) {
  const d = useAppDispatch();

  const input = useRef('');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> & FormEvent<HTMLFormElement>
  ) => {
    input.current = e.target.value;
  };

  const handleSubmit = (
    e: ChangeEvent<HTMLInputElement> & FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    d(changeLayerName({ id, name: input.current }));
    setIsInputVisible(false);
  };

  return (
    <>
      {isInputVisible && (
        <form onSubmit={handleSubmit} onChange={handleChange}>
          <input
            name='change_layer_name'
            type='text'
            className='flex-grow'
            // TODO: fix type
            onBlur={handleSubmit}
            autoFocus
          />
        </form>
      )}
      {!isInputVisible && (
        <Button className='flex-grow' onClick={() => d(activateLayer(id))}>
          {name}
        </Button>
      )}
    </>
  );
}
