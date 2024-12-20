import { RootState } from '../store';

export const selectActiveLayer = (state: RootState) =>
  state.layers.layersList.find(({ active }) => active === true);
