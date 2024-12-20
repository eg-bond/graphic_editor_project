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
  { id: 3, name: 'Действие 1', type: 'pen', active: false },
  { id: 4, name: 'Действие 2', type: 'circle', active: false },
  { id: 5, name: 'Действие 3', type: 'brush', active: false },
  { id: 6, name: 'Действие 1', type: 'pen', active: false },
  { id: 7, name: 'Действие 2', type: 'circle', active: false },
  { id: 8, name: 'Действие 3', type: 'brush', active: false },
  { id: 9, name: 'Действие 1', type: 'pen', active: false },
  { id: 10, name: 'Действие 2', type: 'circle', active: false },
  { id: 11, name: 'Действие 3', type: 'brush', active: false },
  { id: 12, name: 'Действие 1', type: 'pen', active: false },
  { id: 13, name: 'Действие 2', type: 'circle', active: false },
  { id: 14, name: 'Действие 3', type: 'brush', active: false },
  { id: 15, name: 'Действие 3', type: 'brush', active: false },
  { id: 16, name: 'Действие 3', type: 'brush', active: false },
];

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {},
});
