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
    setProject(_, action: PayloadAction<Project>) {
      return action.payload;
    },

    // Обновляет разрешение холста
    updateResolution(state, action: PayloadAction<{
      width: number; height: number;
    }>) {
      state.width = Math.max(200, action.payload.width);
      state.height = Math.max(200, action.payload.height);
    },
  },
});

export const { setProject, updateResolution } = projectSlice.actions;

export default projectSlice.reducer;
