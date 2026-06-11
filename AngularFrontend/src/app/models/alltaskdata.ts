import { IAllTaskData } from "./alltaskdata.interface";
import { ITaskItem } from "./taskitem.interface";

export class AllTaskData implements IAllTaskData {
  name: string="";
  numberoftasks: number=0;
  data: ITaskItem[]=[];
}
