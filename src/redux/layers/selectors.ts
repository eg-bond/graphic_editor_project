import { RootState } from '../store';

export const selectActiveLayer = (state: RootState) =>
  state.layers.list.find(({ active }) => active === true);
