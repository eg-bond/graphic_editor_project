import { historySlice } from './historySlice';

export const historyReducer = historySlice.reducer;

export const { activateHistoryItem, addNewHistoryItem } = historySlice.actions;
