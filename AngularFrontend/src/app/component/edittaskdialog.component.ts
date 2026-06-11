
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
    private groupService: TaskGroupService, private itemService: TaskItemService, @Inject(MAT_DIALOG_DATA) public data: { itemData: TaskItem }) {
    this.dataService = this.taskDataService;
    this.taskItemService = itemService;
    this.taskgroupService = groupService;

    this.taskgroupService.getTaskgroups().subscribe({
      next: data => {
        this.taskgroups = data;
      }
    })

  }

  onCancel(): void {
    console.log('cancel')
    this.dialogRef.close();
  }
  onSave(): void {
    console.log('save check planned')
    //console.log(this.newItem.planned > new Date())
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
    switch (this.selectedPriority) {
      case "Low": {
        this.newItem.priority = this.itemPriority[this.selectedPriority];
        break;
      }
      case "Medium": {
        this.newItem.priority = this.itemPriority[this.selectedPriority];
        break;

      }
      case "High": {
        this.newItem.priority = this.itemPriority[this.selectedPriority];
        break;

      }
    }
    console.log(this.newItem);
    this.dataService.taskdata.subscribe(
      (msg) => (this.dataSource.data = msg)
    );
    this.taskItemService.postTaskItem(this.newItem).subscribe(() => {
      this.dataSource.data = [this.newItem, ...this.dataSource.data]
    })

    //this.dataSource.data = [this.newItem, ...this.dataSource.data]
    //console.log(this.dataSource.data);
    this.dialogRef.close();
  }


}
