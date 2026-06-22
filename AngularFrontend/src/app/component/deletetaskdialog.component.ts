
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
  selector: 'delete-task-dialog',
  templateUrl: './deletetaskdialog.component.html',
  styleUrls: ['./deletetaskdialog.component.css']
})


export class DeleteTaskDialogComponent {

  public dataSource = new MatTableDataSource<ITaskItem>();
  public checkedBoxIds: number[] = [];
  public deleteButtonEnabled: boolean = true;
  public taskgroups: TaskGroup[] = [];

  public addButtonEnabled: boolean = false;

  public editButtonEnabled: boolean = true;
  private taskItemService: TaskItemService;
  private taskGroupService: TaskGroupService;
  constructor(public dialogRef: MatDialogRef<DeleteTaskDialogComponent>, private itemService: TaskItemService, private groupService: TaskGroupService, @Inject(MAT_DIALOG_DATA) public data: {tgGroups:TaskGroup[], deleteIds: number[], dataSource: MatTableDataSource<ITaskItem> }) {
    this.taskItemService = itemService;
    this.taskGroupService = groupService;
    this.dataSource = this.data.dataSource
    this.checkedBoxIds = this.data.deleteIds;
    this.taskgroups = data.tgGroups;

  }

  onNo(): void {
    this.dialogRef.close(true);
  }
  onYes(): void {
    if (this.checkedBoxIds.length == 1) {
      var id = this.checkedBoxIds.pop();
      this.taskItemService.deleteTaskItem(id).subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter(
          (item: ITaskItem) => item.id !== id)
      })

      for (var tg in this.taskgroups) {
        this.taskgroups[tg].taskItems.forEach(value => {
          if (value.id == id) {

            this.taskgroups[tg].taskItems.splice(this.taskgroups[tg].taskItems.findIndex(item => item.id === id), 1);
            // this.taskgroups[tg].taskItems = this.taskgroups[tg].taskItems.filter(item => item.id !== id);

          }

        })
      }
    }
    else {
      this.checkedBoxIds.forEach(value => {
        this.taskItemService.deleteTaskItem(value).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(
            (item: ITaskItem) => item.id !== value)

        })

        for (var tg in this.taskgroups) {
          this.taskgroups[tg].taskItems.forEach(value => {
            if (value.id == id) {
              this.taskgroups[tg].taskItems = this.taskgroups[tg].taskItems.filter(item => item.id !== id);


            }

          })
        }
      })
    }
    this.deleteButtonEnabled = true;
    this.addButtonEnabled = false;
    this.dialogRef.close(this.taskgroups); 
  }

}
