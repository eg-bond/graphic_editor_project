import { createSlice } from '@reduxjs/toolkit';

export type Layer = {
  id: number;
  name: string;
  opacity: number;
  visible: boolean;
};

const initialState: Array<Layer> = [
  { id: 0, name: 'Слой 1', opacity: 0, visible: true },
  { id: 1, name: 'Слой 2', opacity: 0, visible: true },
  { id: 2, name: 'Слой 3', opacity: 0, visible: true },
  { id: 3, name: 'Слой 4', opacity: 0, visible: true },
];

export const layersSlice = createSlice({
  name: 'layers',
  initialState,
  reducers: {},
});
