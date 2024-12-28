import { historySlice } from './historySlice';
import { addNewHistoryItemThunk } from './thunks';

export const historyReducer = historySlice.reducer;

export const { activateHistoryItem, addNewHistoryItem } = historySlice.actions;

export { addNewHistoryItemThunk };
