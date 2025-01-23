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

    // Сохраняет данные проекта в LocalStorage
    saveToLocalStorage(state) {
      const projects = JSON.parse(localStorage.getItem('graphic-projects') || '[]');

      const updatedProjects = projects.map((project: Project) =>
        project.id === state.id ? { ...state } : project,
      );
      localStorage.setItem('graphic-projects', JSON.stringify(updatedProjects));
    },
  },
});

export const {
  setProject,
  updateResolution,
  saveToLocalStorage,
} = projectSlice.actions;

export default projectSlice.reducer;
