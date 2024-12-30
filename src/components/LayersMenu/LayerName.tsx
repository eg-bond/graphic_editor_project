import { addNewHistoryItemThunk } from "@/redux/history";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { changeLayerName } from "@/redux/layers";
import { LayerT } from "@/redux/layers/layersSlice";
import { HistoryItemKinds } from "@/types/historyTypes";
import { validateLayerName } from "@/utils/validateLayerName";
import { Form, Input, InputRef } from "antd";
import { ChangeEvent, useRef, useState } from "react";

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
  const inputValue = useRef("");
  const inputRef = useRef<InputRef | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    inputValue.current = e.target.value;
    if (error) setError(null);
  };

  const handleSubmit = () => {
    const trimmedName = inputValue.current.trim();

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
      {/* Input for renaming layer */}
      {renameInputVisible && (
        <Form onFinish={handleSubmit}>
          <Input
            ref={inputRef}
            name='change_layer_name'
            type='text'
            maxLength={12}
            onBlur={handleSubmit}
            onChange={handleChange}
            autoFocus
          />
          {error && <span className='text-red-500 text-sm'>{error}</span>}
        </Form>
      )}
      {/* Current layer name */}
      {!renameInputVisible && <span>{name}</span>}
    </div>
  );
}
