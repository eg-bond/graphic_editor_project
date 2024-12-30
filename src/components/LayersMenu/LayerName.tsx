import { addNewHistoryItemThunk } from "@/redux/history";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { changeLayerName } from "@/redux/layers";
import { LayerT } from "@/redux/layers/layersSlice";
import { HistoryItemKinds } from "@/types/historyTypes";
import { validateLayerName } from "@/utils/validateLayerName";
import { Form, Input, InputRef } from "antd";
import { ChangeEvent, useRef, useState, useEffect } from "react";

type ILayerName = {
  i: number;
  name: LayerT["name"];
  renameInputVisible: boolean;
  setRenameInputVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: () => void;
};

export function LayerName({
  i,
  name,
  renameInputVisible,
  setRenameInputVisible,
  onClick
}: ILayerName) {
  const d = useAppDispatch();
  const layersList = useAppSelector(state => state.layers.list);
  const existingNames = layersList.map(layer => layer.name);
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
    const trimmedName = inputValue.trim();

    if (!trimmedName) {
      setError("Поле не может быть пустым");
      inputRef.current?.focus();
      return;
    }

    const validationError = validateLayerName(trimmedName, existingNames);
    if (validationError) {
      setError(validationError);
      inputRef.current?.focus();
      return;
    }

    d(changeLayerName({ index: i, name: trimmedName }));
    d(addNewHistoryItemThunk(HistoryItemKinds.Rename));
    setRenameInputVisible(false);
  };

  return (
    <div className='flex-[0.75]' onClick={onClick}>
      {renameInputVisible && (
        <Form onFinish={handleSubmit}>
          <Input
            ref={inputRef}
            name='change_layer_name'
            type='text'
            maxLength={12}
            value={inputValue}
            onChange={handleChange}
            onBlur={handleSubmit}
            autoFocus
          />

          {error && <span className='text-red-500 text-sm'>{error}</span>}
        </Form>
      )}

      {!renameInputVisible && <span>{name}</span>}
    </div>
  );
}
