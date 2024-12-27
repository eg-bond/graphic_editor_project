import { HistoryItemKinds } from '@/types/historyTypes';
import { AppThunk } from '../store';
import { addNewHistoryItem } from '.';

// This thunk needed only to get layersList from layersSlice ..
// .. and pass it to historySlice 'addNewHistoryItem' action
export const addNewHistoryItemThunk = (kind: HistoryItemKinds): AppThunk => {
  return (d, getState) => {
    const state = getState();
    const layersList = state.layers.list;

    d(addNewHistoryItem({ kind, layersList }));
  };
};
