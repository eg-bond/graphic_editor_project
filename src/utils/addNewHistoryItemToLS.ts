import { RootState } from '@/redux/store';
import { PROJECTS_KEY } from './constants';
import { getProjectsFromLS } from './getProjectsFromLS';

export const addNewHistoryItemToLS = (historyState: RootState['history']) => {
  const { allProjects, currentProject } = getProjectsFromLS(historyState.projectId);

  currentProject.data = {
    items: historyState.items,
    historyIdCount: historyState.historyIdCount,
    activeItemIndex: historyState.activeItemIndex,
    layerIdCount: historyState.layerIdCount,
  };

  localStorage.setItem(PROJECTS_KEY, JSON.stringify(allProjects));
};
