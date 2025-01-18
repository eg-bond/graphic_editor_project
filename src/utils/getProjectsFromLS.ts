import { PROJECTS_KEY } from './constants';
import { Project } from '@/types/localStorageTypes';

export const getProjectsFromLS = (id?: string) => {
  const allProjects = JSON.parse(localStorage.getItem(PROJECTS_KEY) ?? '[]');

  if (!id) {
    return { allProjects, currentProject: null };
  }

  const currentProject: Project = allProjects.find(
    (project: Project) => project.id === id,
  );

  return { allProjects, currentProject };
};
