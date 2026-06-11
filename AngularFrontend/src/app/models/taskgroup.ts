import { ITaskGroup } from '../models/taskgroup.interface';
import { ItemType } from '../utils/enum.types';
import { ITaskItem } from './taskitem.interface';
export class TaskGroup implements ITaskGroup {
  id?: number;
  type: ItemType = ItemType.Family;
  taskItems: ITaskItem[]=[];
}
