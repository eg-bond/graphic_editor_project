import { HistoryItemKinds } from '@/types/historyTypes';
import { Rule } from 'antd/es/form';

export const PROJECTS_KEY = 'graphic-projects';

export const NEW_LAYER_NAME = 'Cлой ';
// canvas data string for empty 1x1 pixels image
export const EMPTY_CANVAS_DATA = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NgAAIAAAUAAR4f7BQAAAAASUVORK5CYII=';

export const DEFAULT_TOOLS_COLOR = '#000000';
export const DEFAULT_TOOLS_SECONDARY_COLOR = '#FF000000';

export const MENU_WIDTH = 150;
export const MENU_HEIGHT = 100;

export const MIN_CANVAS_WIDTH_AND_HEIGHT = 200;
export const MAX_CANVAS_WIDTH_AND_HEIGHT = 5000;

export const WIDTH_AND_HEIGHT_VALIDATION_RULES: Rule[] = [
  {
    required: true,
    message: 'Это поле обязательно',
  },
  {
    min: MIN_CANVAS_WIDTH_AND_HEIGHT,
    type: 'number',
    message: `Минимальное значение ${MIN_CANVAS_WIDTH_AND_HEIGHT}px`,
  },
  {
    max: MAX_CANVAS_WIDTH_AND_HEIGHT,
    type: 'number',
    message: `Максимальное значение ${MAX_CANVAS_WIDTH_AND_HEIGHT}px`,
  },
];

export const FIRST_HISTORY_ITEM = {
  id: 0,
  kind: HistoryItemKinds.OpenProject,
  layersList: [],
  activeLayerIndex: -1,
  width: MIN_CANVAS_WIDTH_AND_HEIGHT,
  height: MIN_CANVAS_WIDTH_AND_HEIGHT,
};
