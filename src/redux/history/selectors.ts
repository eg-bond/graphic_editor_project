import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Base selector for history state
const selectHistory = (state: RootState) => state.history;

// Memoized selector for history items
const selectHistoryItems = createSelector(
  [selectHistory],
  history => history.items,
);

// Memoized selector for active index
const selectActiveHistoryItemIndex = createSelector(
  [selectHistory],
  history => history.activeItemIndex,
);

// Memoized selector for active history item
export const selectActiveHistoryItem = createSelector(
  [selectHistoryItems, selectActiveHistoryItemIndex],
  (items, activeIndex) => items[activeIndex],
);

// Memoized selector for active layer index
export const selectActiveLayerIndex = createSelector(
  [selectActiveHistoryItem],
  activeItem => activeItem?.activeLayerIndex ?? 0,
);

// Memoized selector for layers list
export const selectLayersList = createSelector(
  [selectActiveHistoryItem],
  activeItem => activeItem?.layersList ?? [],
);

// Memoized selector for active layer
export const selectActiveLayer = createSelector(
  [selectLayersList, selectActiveLayerIndex],
  (layersList, activeLayerIndex) => layersList[activeLayerIndex] ?? [],
);

// Memoized selector for width and height
export const selectWidthAndHeight = createSelector(
  [selectActiveHistoryItem],
  (activeItem) => {
    return {
      width: activeItem.width,
      height: activeItem.height,
    };
  },
);
