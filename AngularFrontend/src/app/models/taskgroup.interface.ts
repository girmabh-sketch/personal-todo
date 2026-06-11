import { ItemType } from '../utils/enum.types';
import { ITaskItem } from './taskitem.interface';
export interface ITaskGroup {
  id?: number;
  type: ItemType;
  taskItems: ITaskItem[];
}
