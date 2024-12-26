import { LayerHistoryActions } from '@/types/historyTypes';
import { AppThunk } from '../store';
import { historySlice } from './historySlice';

export const addNewHistoryItemThunk = (
  actionType: LayerHistoryActions
): AppThunk => {
  return (d, getState) => {
    const state = getState();
    // current layersList (after action)
    const layersList = state.layers.list;

    d(historySlice.actions.addNewHistoryItem({ type: actionType, layersList }));
  };
};
