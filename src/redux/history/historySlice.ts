import { HistoryItemKinds } from '@/types/historyTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PROJECTS_KEY } from '@/utils/constants.ts';
import { swapArrayElements } from '@/utils/swapArrayElements.ts';
import { RootState } from '@/redux/store.ts';

export interface LayerT {
  id: number;
  name: string;
  opacity: number;
  visible: boolean;
}

export type HistoryItemT = {
  id: number;
  kind: HistoryItemKinds;
  layersList: Array<LayerT>;
  activeLayerIndex: number;
};

export interface HistorySliceStateT extends ProjectData {
  projectId: string | null;
  maxHistoryLength: number;
}

interface ProjectData {
  items: Array<HistoryItemT>;
  historyIdCount: number;
  activeItemIndex: number;
  layerIdCount: number;
}

export interface Project {
  id: string;
  name: string;
  width: number;
  height: number;
  data?: ProjectData;
}

export interface HistoryItem {
  kind: HistoryItemKinds;
  layersList: Array<LayerT>;
  activeLayerIndex: number;
}

const HISTORY_MAX_LENGTH = 20;

const initialState: HistorySliceStateT = {
  projectId: null,
  items: [],
  historyIdCount: 0,
  activeItemIndex: 0,
  maxHistoryLength: HISTORY_MAX_LENGTH,
  layerIdCount: 0,
};

const NEW_LAYER_NAME = 'Cлой ';

const addNewHistoryItem = (state: RootState['history'], payload: HistoryItem) => {
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
    kind: payload.kind,
    layersList: payload.layersList,
    activeLayerIndex: payload.activeLayerIndex,
  };
  state.historyIdCount++;
  state.items.push(newItem);
  state.activeItemIndex = state.items.length - 1;

  const allProjects = JSON.parse(localStorage.getItem(PROJECTS_KEY) ?? '[]');

  const currentProject: Project = allProjects.find(
    (project: Project) => project.id === state.projectId,
  );
  currentProject.data = {
    items: state.items,
    historyIdCount: state.historyIdCount,
    activeItemIndex: state.activeItemIndex,
    layerIdCount: state.layerIdCount,
  };

  localStorage.setItem(PROJECTS_KEY, JSON.stringify(allProjects));
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setProjectData: (state, action: PayloadAction<{
      id: string; data?: ProjectData;
    }>) => {
      state.projectId = action.payload.id;
      if (action.payload.data) {
        state.items = action.payload.data.items;
        state.historyIdCount = action.payload.data.historyIdCount;
        state.activeItemIndex = action.payload.data.activeItemIndex;
        state.layerIdCount = +action.payload.data.layerIdCount || 0;
      } else {
        state.items = [];
        state.historyIdCount = 0;
        state.activeItemIndex = -1;
        state.layerIdCount = 0;
      }
    },
    activateHistoryItem: (state, action: PayloadAction<{
      index: number;
    }>) => {
      state.activeItemIndex = action.payload.index;
    },
    setStateFromHistory: (state, action: PayloadAction<{
      layersList: Array<LayerT>;
    }>) => {
      state.items[state.activeItemIndex].layersList = action.payload.layersList;
    },
    addLayer: (state) => {
      state.layerIdCount++;
      const newLayer: LayerT = {
        id: state.layerIdCount,
        name: NEW_LAYER_NAME + String(state.layerIdCount),
        opacity: 100,
        visible: true,
      };

      const layers = [...(state.items[state.activeItemIndex]?.layersList ?? [])];
      layers.push(newLayer);
      addNewHistoryItem(state, {
        kind: HistoryItemKinds.Add,
        layersList: layers,
        activeLayerIndex: layers.length,
      });
    },
    removeLayer: (state, action: PayloadAction<{
      index: number;
    }>) => {
      const activeElement = state.items[state.activeItemIndex];
      const layers = [...(activeElement?.layersList ?? [])];

      layers.splice(action.payload.index, 1);

      addNewHistoryItem(state, {
        kind: HistoryItemKinds.Remove,
        layersList: layers,
        activeLayerIndex: activeElement?.activeLayerIndex ?? -1,
      });
    },
    activateLayer: (state, action: PayloadAction<{
      index: number;
    }>) => {
      state.items[state.activeItemIndex].activeLayerIndex = action.payload.index;
    },
    changeOpacity: (state, action: PayloadAction<{
      activeLayerIndex: number; opacity: number;
    }>) => {
      const activeElement = state.items[state.activeItemIndex];
      const layers = [...(activeElement?.layersList ?? [])];

      const index = action.payload.activeLayerIndex;

      layers[index] = { ...layers[index], opacity: action.payload.opacity };

      addNewHistoryItem(state, {
        kind: HistoryItemKinds.Opacity,
        layersList: layers,
        activeLayerIndex: activeElement?.activeLayerIndex ?? -1,
      });
    },
    changeLayerVisibility: (state, action: PayloadAction<{
      index: number;
    }>) => {
      const activeElement = state.items[state.activeItemIndex];
      const layers = [...(activeElement?.layersList ?? [])];

      const index = action.payload.index;

      layers[index] = { ...layers[index], visible: !layers[index].visible };

      addNewHistoryItem(state, {
        kind: HistoryItemKinds.Visibility,
        layersList: layers,
        activeLayerIndex: activeElement?.activeLayerIndex ?? -1,
      });
    },
    changeLayerName: (state, action: PayloadAction<{
      index: number; name: string;
    }>) => {
      const i = action.payload.index;
      state.items[state.activeItemIndex].layersList[i].name = action.payload.name;

      const allProjects = JSON.parse(localStorage.getItem(PROJECTS_KEY) ?? '[]');

      const currentProject: Project = allProjects.find(
        (project: Project) => project.id === state.projectId,
      );
      currentProject.data = {
        items: state.items,
        historyIdCount: state.historyIdCount,
        activeItemIndex: state.activeItemIndex,
        layerIdCount: state.layerIdCount,
      };

      localStorage.setItem(PROJECTS_KEY, JSON.stringify(allProjects));
    },
    moveLayerUp: (state, action: PayloadAction<{
      index: number;
    }>) => {
      const { index } = action.payload;

      if (index <= 0) {
        return;
      }

      const activeElement = { ...state.items[state.activeItemIndex] };
      activeElement.layersList = [...activeElement.layersList];
      if (activeElement.activeLayerIndex === index) {
        activeElement.activeLayerIndex = index - 1;
      }
      swapArrayElements(activeElement.layersList, index, index - 1);

      addNewHistoryItem(state, {
        kind: HistoryItemKinds.Order,
        layersList: activeElement.layersList,
        activeLayerIndex: activeElement?.activeLayerIndex ?? -1,
      });
    },
    moveLayerDown: (state, action: PayloadAction<{
      index: number;
    }>) => {
      const { index } = action.payload;

      if (index >= state.items[state.activeItemIndex].layersList.length - 1) {
        return;
      }

      const activeElement = { ...state.items[state.activeItemIndex] };
      activeElement.layersList = [...activeElement.layersList];
      if (activeElement.activeLayerIndex === index) {
        activeElement.activeLayerIndex = index + 1;
      }
      swapArrayElements(activeElement.layersList, index, index + 1);

      addNewHistoryItem(state, {
        kind: HistoryItemKinds.Order,
        layersList: activeElement.layersList,
        activeLayerIndex: activeElement?.activeLayerIndex ?? -1,
      });
    },
  },
});
