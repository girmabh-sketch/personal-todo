import { ITaskItem } from './taskitem.interface';
import { ItemPriority, ItemStatus } from '../utils/enum.types';

export class TaskItem implements ITaskItem {
  id: number = 0;
  name: string = '';
  taskGroupId: number = 1;
  created: Date = new Date();
  status: ItemStatus = ItemStatus.Created;
  planned?: Date | null = null;
  priority: ItemPriority = ItemPriority.Low;
}
