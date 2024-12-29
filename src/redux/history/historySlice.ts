import { HistoryItemKinds } from '@/types/historyTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LayerT } from '../layers/layersSlice';
import { PROJECTS_KEY } from '@/utils/constants.ts';

export type HistoryItemT = {
  id: number;
  kind: HistoryItemKinds;
  layersList: Array<LayerT>;
};

export interface HistorySliceStateT extends ProjectData {
  projectId: string | null;
  maxHistoryLength: number;
}

interface ProjectData {
  items: Array<HistoryItemT>;
  historyIdCount: number;
  activeItemIndex: number;
}

export interface Project {
  id: string;
  name: string;
  width: number;
  height: number;
  data?: ProjectData;
}

const HISTORY_MAX_LENGTH = 20;

const initialState: HistorySliceStateT = {
  projectId: null,
  items: [],
  historyIdCount: 0,
  activeItemIndex: -1,
  maxHistoryLength: HISTORY_MAX_LENGTH,
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setProjectData: (state, action: PayloadAction<{ id: string; data?: ProjectData }>) => {
      state.projectId = action.payload.id;
      if (action.payload.data) {
        state.items = action.payload.data.items;
        state.historyIdCount = action.payload.data.historyIdCount;
        state.activeItemIndex = action.payload.data.activeItemIndex;
      }
    },
    activateHistoryItem: (state, action: PayloadAction<{ index: number }>) => {
      state.activeItemIndex = action.payload.index;
    },
    addNewHistoryItem: (
      state,
      action: PayloadAction<{
        kind: HistoryItemKinds;
        layersList: Array<LayerT>;
      }>
    ) => {
      // Manage history size
      if (state.items.length >= state.maxHistoryLength) {
        state.items.shift();
      }
      // Remove future history if we're not at the end
      if (state.activeItemIndex !== state.items.length - 1) {
        state.items = state.items.slice(0, state.activeItemIndex + 1);
      }
      // Add new history item
      const newItem: HistoryItemT = {
        id: state.historyIdCount,
        kind: action.payload.kind,
        layersList: action.payload.layersList,
      };
      state.historyIdCount++;
      state.items.push(newItem);
      state.activeItemIndex = state.items.length - 1;

      const allProjects = JSON.parse(localStorage.getItem(PROJECTS_KEY) ?? '[]');

      const currentProject: Project = allProjects.find((project: Project) => project.id === state.projectId);
      currentProject.data = {
        items: state.items,
        historyIdCount: state.historyIdCount,
        activeItemIndex: state.activeItemIndex,
      };

      localStorage.setItem(PROJECTS_KEY, JSON.stringify(allProjects));
    },
  },
});
