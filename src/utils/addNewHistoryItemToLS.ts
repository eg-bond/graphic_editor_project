import { RootState } from '@/redux/store';
import { PROJECTS_KEY } from './constants';
import { getProjectsFromLS } from './getProjectsFromLS';

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
