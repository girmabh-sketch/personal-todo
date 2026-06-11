import {ItemPriority, ItemStatus } from '../utils/enum.types';
export interface ITaskItem {
  id?: number;
  name: string;
  taskGroupId: number;
  created: Date;
  status: ItemStatus;
  planned?: Date | null;
  priority: ItemPriority;
}
