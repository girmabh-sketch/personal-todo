// taskdata.service.ts
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITaskItem} from '../models/taskitem.interface';
import { ItemDashboard, ItemType } from '../utils/enum.types';
import { ITaskGroup } from '../models/taskgroup.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskDataService {
  private groupDataSource = new BehaviorSubject<ITaskGroup[]>([]);
  groupData = this.groupDataSource.asObservable();

  private taskdataSource = new BehaviorSubject<ITaskItem[]>([]);
  taskdata = this.taskdataSource.asObservable();

  private groupnameSource = new BehaviorSubject<ItemDashboard>(ItemDashboard.Family);
  groupname = this.groupnameSource.asObservable();

  private datanameSource = new BehaviorSubject<ItemDashboard>(ItemDashboard.Family);
  dataname = this.datanameSource.asObservable();

 

  updateData(newdata: ITaskItem[], name: ItemDashboard): void {
  
    this.taskdataSource.next(newdata); // Update the signal's value
    this.datanameSource.next(name);
  }
  updateSharedGroupData(newdata: ITaskGroup[]): void {
    this.groupDataSource.next(newdata); // Update the signal's value
  }

  updateSharedData(newdata: ITaskGroup[], data: ITaskItem[]): void {
    this.taskdataSource.next(data); // Update the signal's value
  }


  updateTaskData(newdata: ITaskItem[], newGroupName: ItemDashboard): void {
    this.taskdataSource.next(newdata); // Update the signal's value
    this.datanameSource.next(newGroupName);

  }

}
