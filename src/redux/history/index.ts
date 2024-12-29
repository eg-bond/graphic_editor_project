import { historySlice } from './historySlice';
import { addNewHistoryItemThunk } from './thunks';

export const historyReducer = historySlice.reducer;

export const { activateHistoryItem, addNewHistoryItem, setProjectData } = historySlice.actions;

export { addNewHistoryItemThunk };

export type { Project } from './historySlice.ts';
