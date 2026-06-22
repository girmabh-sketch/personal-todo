//import { Component } from '@angular/core';
//import { MatDialogRef } from '@angular/material/dialog';

//@Component({
//  selector: 'add-task-dialog',
//  templateUrl: './addtaskdialog.component.html',
//})
//export class AddTaskDialogComponent {

//  constructor(public dialogRef: MatDialogRef<AddTaskDialogComponent>) { }

//  onClose(): void {
//    this.dialogRef.close();
//  }
//}


import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemPriority, ItemStatus, ItemType} from '../utils/enum.types';
import { ITaskItem } from '../models/taskitem.interface';
import { TaskItem } from '../models/taskitem';
import { TaskDataService } from '../service/taskdata.service';
import { MatTableDataSource } from '@angular/material/table';
import { TaskItemService } from '../service/taskitem.service';
import { TaskGroupService } from '../service/taskgroup.service';
import { TaskGroup } from '../models/taskgroup';

@Component({
  selector: 'add-task-dialog',
  templateUrl: './addtaskdialog.component.html'
/*  styleUrls: ['./material-modal.component.css']*/
})


export class AddTaskDialogComponent {

  ItemType = ItemType;
  //ItemType: typeof ItemType = ItemType;
  ItemPriority: typeof ItemPriority = ItemPriority;
  itemPriority=ItemPriority;
  selectedPriority: string = "Low";
  selectedType: ItemType = ItemType.Family;
  selectedTaskType = null;
  scheduled: Date = new Date();
  public taskgroups: TaskGroup[] = [];

  priorityOptions: string[] = ["Low", "Medium", "High"];


  public newItem: TaskItem = new TaskItem();
  public dataSource = new MatTableDataSource<ITaskItem>();
  public dataService: TaskDataService;
  private taskItemService: TaskItemService;
  private taskgroupService: TaskGroupService;
  constructor(public dialogRef: MatDialogRef<AddTaskDialogComponent>, private taskDataService: TaskDataService,
    private groupService: TaskGroupService, private itemService: TaskItemService, @Inject(MAT_DIALOG_DATA) public data: { itemData: TaskItem }) {
    this.dataService = this.taskDataService;
    this.taskItemService = itemService;
    this.taskgroupService = groupService;
    this.newItem = data.itemData;

    this.taskgroupService.getTaskgroups().subscribe({
      next: data => {
        this.taskgroups = data;
      }
    })

  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
  onSave(): void {
  
    switch (this.selectedType) {
      case this.ItemType["Family"]: {
        this.newItem.taskGroupId = 1;
        break;
      }
      case this.ItemType["Home"]: {
        this.newItem.taskGroupId = 2;
        break;

      }
      case this.ItemType["Work"]: {
        this.newItem.taskGroupId = 3;
        break;

      }
      case this.ItemType["Social"]: {
        this.newItem.taskGroupId = 4;
        break;

      }
    }
    switch (this.selectedPriority){
    case "Low": {
        this.newItem.priority = ItemPriority.Low;
        break;
      }
      case "Medium": {
        this.newItem.priority = ItemPriority.Medium;
        break;

      }
      case "High": {
        this.newItem.priority = ItemPriority.High;
        break;

      }
    }

    if (this.newItem.planned != null) {
      this.newItem.status = ItemStatus.Planned;
    }
    this.dataService.taskdata.subscribe(
      (msg) => (this.dataSource.data = msg)
    );

    this.taskItemService.postTaskItem(this.newItem).subscribe({
      next: data => {
        this.newItem = data;
        this.dataSource.data = [this.newItem, ...this.dataSource.data]
        this.dialogRef.close(this.newItem); 
      }
    })

  }


}
