import { RootState } from '@/redux/store'; // Убедись, что путь к store правильный

// Селектор для получения всех данных проекта
export const selectProject = (state: RootState) => state.project;

// Селектор для получения ширины холста
export const selectCanvasWidth = (state: RootState) => state.project.width;

// Селектор для получения высоты холста
export const selectCanvasHeight = (state: RootState) => state.project.height;

// Селектор для получения имени проекта
export const selectProjectName = (state: RootState) => state.project.name;
