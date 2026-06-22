
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemPriority, ItemType } from '../utils/enum.types';
import { ITaskItem } from '../models/taskitem.interface';
import { TaskItem } from '../models/taskitem';
import { TaskDataService } from '../service/taskdata.service';
import { MatTableDataSource } from '@angular/material/table';
import { TaskItemService } from '../service/taskitem.service';
import { TaskGroupService } from '../service/taskgroup.service';
import { TaskGroup } from '../models/taskgroup';

@Component({
  selector: 'edit-task-dialog',
  templateUrl: './edittaskdialog.component.html'
  /*  styleUrls: ['./material-modal.component.css']*/
})


export class EditTaskDialogComponent {

  ItemType = ItemType;
  //ItemType: typeof ItemType = ItemType;
  ItemPriority: typeof ItemPriority = ItemPriority;
  itemPriority = ItemPriority;
  selectedPriority: string = "Low";
  selectedType: ItemType = ItemType.Family;
  selectedTaskType = null;
  scheduled: Date = new Date();
  public taskgroups: TaskGroup[] = [];

  priorityOptions: string[] = ["Low", "Medium", "High"];

  public editItem: TaskItem = new TaskItem();
  public newItem: TaskItem = new TaskItem();
  public dataSource = new MatTableDataSource<ITaskItem>();
  public dataService: TaskDataService;
  private taskItemService: TaskItemService;
  private taskgroupService: TaskGroupService;
  constructor(public dialogRef: MatDialogRef<EditTaskDialogComponent>, private taskDataService: TaskDataService,
    private groupService: TaskGroupService, private itemService: TaskItemService,
    @Inject(MAT_DIALOG_DATA) public data: { tgGroups: TaskGroup[], itemData: TaskItem }) {
    this.dataService = this.taskDataService;
    this.taskItemService = itemService;
    this.taskgroupService = groupService;
    this.editItem = data.itemData;

    this.taskgroups = data.tgGroups;


    //this.taskgroupService.getTaskgroups().subscribe({
    //  next: data => {
    //    this.taskgroups = data;
    //  }
    //})

  }

  onCancel(): void {

    this.dialogRef.close(true);
  }
  onSave(): void {
    //switch (this.selectedType) {
    //  case this.ItemType["Family"]: {
    //    this.editItem.taskGroupId = 1;
    //    break;
    //  }
    //  case this.ItemType["Home"]: {
    //    this.editItem.taskGroupId = 2;
    //    break;

    //  }
    //  case this.ItemType["Work"]: {
    //    this.editItem.taskGroupId = 3;
    //    break;

    //  }
    //  case this.ItemType["Social"]: {
    //    this.editItem.taskGroupId = 4;
    //    break;

    //  }
    //}

    switch (this.selectedPriority) {
      case "Low": {
        this.editItem.priority = ItemPriority.Low;
        break;
      }
      case "Medium": {
        this.editItem.priority = ItemPriority.Medium;
        break;

      }
      case "High": {
        this.editItem.priority = ItemPriority.High;
        break;

      }
    }

    this.dataService.taskdata.subscribe(
      (msg) => (this.dataSource.data = msg)
    );
    this.taskItemService.putTaskItem(this.editItem.id, this.editItem).subscribe(() => {
      this.dataSource.data = [this.editItem, ...this.dataSource.data]
      //this.dialogRef.close(this.editItem);
      this.dialogRef.close(this.taskgroups); 
    })    
  }

}
