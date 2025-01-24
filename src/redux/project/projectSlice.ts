import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Project } from '@/types/localStorageTypes';

const initialState: Project = {
  id: '',
  name: '',
  width: 0,
  height: 0,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProject(state, action: PayloadAction<Project>) {
      return action.payload;
    },

    // Обновляет разрешение холста
    updateResolution(state, action: PayloadAction<{
      width: number; height: number;
    }>) {
      state.width = action.payload.width;
      state.height = action.payload.height;
    },
  },
});

export const { setProject, updateResolution } = projectSlice.actions;

export default projectSlice.reducer;
