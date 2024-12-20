import { createSlice } from '@reduxjs/toolkit';

export type HistoryT = {
  id: number;
  name: string;
  type: string;
  active: boolean;
};

const initialState: Array<HistoryT> = [
  { id: 0, name: 'Действие 1', type: 'pen', active: false },
  { id: 1, name: 'Действие 2', type: 'circle', active: false },
  { id: 2, name: 'Действие 3', type: 'brush', active: false },
];

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {},
});
