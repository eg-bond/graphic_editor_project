import { addNewHistoryItemThunk } from "@/redux/history";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  changeLayerName,
  setRenameInputValue,
  setRenameError,
  resetRenameState
} from "@/redux/layers";
import { LayerT } from "@/redux/layers/layersSlice";
import { HistoryItemKinds } from "@/types/historyTypes";
import { validateLayerName } from "@/utils/validateLayerName";
import { Form, Input, InputRef } from "antd";
import { ChangeEvent, useRef, useEffect } from "react";

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
  const renameState = useAppSelector(state => state.layers.renameState);
  const existingNames = layersList.map(layer => layer.name);
  const inputRef = useRef<InputRef | null>(null);

  useEffect(() => {
    if (renameInputVisible) {
      d(setRenameInputValue(name));
    }
  }, [renameInputVisible, name, d]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    d(setRenameInputValue(e.target.value));
    if (renameState.error) d(setRenameError(null));
  };

  const handleSubmit = () => {
    const trimmedName = renameState.inputValue.trim();

    if (!trimmedName) {
      d(setRenameError("Поле не может быть пустым"));
      inputRef.current?.focus();
      return;
    }

    const validationError = validateLayerName(trimmedName, existingNames);
    if (validationError) {
      d(setRenameError(validationError));
      inputRef.current?.focus();
      return;
    }

    d(changeLayerName({ index: i, name: trimmedName }));
    d(addNewHistoryItemThunk(HistoryItemKinds.Rename));
    setRenameInputVisible(false);
    d(resetRenameState());
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
            value={renameState.inputValue}
            onChange={handleChange}
            onBlur={handleSubmit}
            autoFocus
          />
          {renameState.error && (
            <span className='text-red-500 text-sm'>{renameState.error}</span>
          )}
        </Form>
      )}
      {!renameInputVisible && <span>{name}</span>}
    </div>
  );
}
