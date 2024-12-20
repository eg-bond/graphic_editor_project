import { RootState } from '../store';

export const selectActiveLayer = (state: RootState) =>
  state.layers.find(({ active }) => active === true);
