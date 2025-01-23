import { PROJECTS_KEY } from './constants';
import { Project } from '@/types/localStorageTypes';

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
