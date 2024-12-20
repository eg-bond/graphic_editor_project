import { createSlice } from '@reduxjs/toolkit';

export type HistoryT = {
  history: string;
};

const initialState: Array<HistoryT> = [{ history: 'history' }];

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {},
});
