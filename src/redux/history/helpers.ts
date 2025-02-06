import { RootState } from '../store';
import { HistoryItemT } from './historySlice';

export const addNewHistoryItemToState = (
  state: RootState['history'],
  payload: Omit<HistoryItemT, 'id'>,
) => {
  // Manage history size
  if (state.items.length > state.maxHistoryLength) {
    state.items.shift();
  }
  // Remove future history if we're not at the end

  if (state.activeItemIndex !== state.items.length - 1) {
    state.items = state.items.slice(0, state.activeItemIndex + 1);
  }
  // Add new history item
  const newItem: HistoryItemT = {
    id: state.historyIdCount,
    kind: payload.kind,
    layersList: payload.layersList,
    activeLayerIndex: payload.activeLayerIndex,
    width: payload.width ?? 0,
    height: payload.height ?? 0,
  };

  state.historyIdCount++;
  state.items.push(newItem);
  state.activeItemIndex = state.items.length - 1;
};
