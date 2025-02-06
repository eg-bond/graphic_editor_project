import { RootState } from '@/redux/store';
import { PROJECTS_KEY } from './constants';
import { Project, Statuses } from '@/types/localStorageTypes';

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

// Сохраняет новый проект в LS
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
    project.id === id
      ? {
          ...project,
          ...dataToUpdate,
          width: Math.max(200, dataToUpdate.width ?? project.width),
          height: Math.max(200, dataToUpdate.height ?? project.height),
        }
      : project,
  );

  localStorage.setItem(PROJECTS_KEY, JSON.stringify(updatedProjects));
};

// Обновляет data конкретного проекта в LS (historyItem, historyIdCount, layerIdCount)
export const addNewHistoryItemToLS = (
  historyState: RootState['history'],
): Statuses => {
  const { allProjects, currentProject } = getProjectsFromLS(historyState.projectId);

  if (!currentProject) return Statuses.Error;

  currentProject.data = {
    historyItem: historyState.items[historyState.activeItemIndex],
    historyIdCount: historyState.historyIdCount,
    layerIdCount: historyState.layerIdCount,
  };

  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(allProjects));
    return Statuses.Success;
  } catch (storageError) {
    console.error('Failed to save projects to localStorage:', storageError);
    return Statuses.Error;
  }
};
