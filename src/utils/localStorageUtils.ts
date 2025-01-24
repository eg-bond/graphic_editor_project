import { RootState } from '@/redux/store';
import { PROJECTS_KEY } from './constants';
import { Project } from '@/types/localStorageTypes';

// Возвращает все проекты из LS и конкретный проект (если предоставлен id)
export const getProjectsFromLS = (id?: string | null) => {
  const allProjects: Project[] = JSON.parse(
    localStorage.getItem(PROJECTS_KEY) ?? '[]',
  );

  if (!id) {
    return { allProjects, currentProject: undefined };
  }

  const currentProject: Project | undefined = allProjects.find(
    (project: Project) => project.id === id,
  );

  return { allProjects, currentProject };
};

// Созраняет новый проект в LS
export const saveNewProjectToLS = (newProject: Project) => {
  const { allProjects } = getProjectsFromLS();

  const newProjects = [{ ...newProject }, ...allProjects];

  localStorage.setItem(PROJECTS_KEY, JSON.stringify(newProjects));
};

// Обновляет данные существующего проекта в LS (width, height, name)
export const updateProjectInLS = (
  id: string | null | undefined,
  dataToUpdate: Partial<Project>,
) => {
  if (!id) return;

  const { allProjects } = getProjectsFromLS();

  const updatedProjects = allProjects.map((project: Project) =>
    project.id === id ? { ...project, ...dataToUpdate } : project,
  );

  localStorage.setItem(PROJECTS_KEY, JSON.stringify(updatedProjects));
};

// Обновляет data конкретного проекта в LS (historyItem, historyIdCount, layerIdCount)
export const addNewHistoryItemToLS = (historyState: RootState['history']) => {
  const { allProjects, currentProject } = getProjectsFromLS(historyState.projectId);

  if (!currentProject) return;

  currentProject.data = {
    historyItem: historyState.items[historyState.activeItemIndex],
    historyIdCount: historyState.historyIdCount,
    layerIdCount: historyState.layerIdCount,
  };

  localStorage.setItem(PROJECTS_KEY, JSON.stringify(allProjects));
};
