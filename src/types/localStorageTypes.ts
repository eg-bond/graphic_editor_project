import { HistoryItemT } from '@/redux/history/historySlice';

export interface ProjectData {
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
