import { ITaskItem } from "./taskitem.interface";

export interface IAllTaskData {
  name: string;
  numberoftasks: number;
  data: ITaskItem[];
}
