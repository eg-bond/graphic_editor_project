import { HistoryItemT } from '@/redux/history/historySlice';

export interface ProjectData {
  historyItem: HistoryItemT;
  historyIdCount: number;
  layerIdCount: number;
}

export interface Project {
  id: string;
  name: string;
  data?: ProjectData;
}

export enum Statuses {
  Success = 'success',
  Error = 'error',
}
