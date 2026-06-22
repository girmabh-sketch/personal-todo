import { Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import { TaskDataService } from '../service/taskdata.service';
import { TaskItem } from '../models/taskitem';
import { ITaskItem } from '../models/taskitem.interface';
import { TaskGroup } from '../models/taskgroup';
import { ItemDashboard, ItemPriority, ItemType } from '../utils/enum.types';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table'
import { AddTaskDialogComponent } from './addtaskdialog.component';
import { TaskItemService } from '../service/taskitem.service';
import { EditTaskDialogComponent } from './edittaskdialog.component';
import { AlertDialogComponent } from './alertdialog.component';
import { TaskGroupService } from '../service/taskgroup.service';
import { DeleteTaskDialogComponent } from './deletetaskdialog.component';


@Component({
  selector: 'task-list',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})

export class TaskListComponent implements OnInit {

  @Output() taskItemEvent: EventEmitter<TaskItem> = new EventEmitter<TaskItem>();
  @Output() taskGroupsEvent: EventEmitter<TaskGroup[]> = new EventEmitter<TaskGroup[]>();

  public enum_Type = ItemType;

  public ItemDashboard = ItemDashboard;
  public ItemPriority = ItemPriority;
  public editItem: TaskItem = new TaskItem();
  public addItem: TaskItem = new TaskItem();
  public taskGroups: TaskGroup[] = [];


  public checkedBoxIds: number[] = [];

  public isChecked: boolean = false;

  public deleteButtonEnabled: boolean = true;

  public addButtonEnabled: boolean = false;

  public editButtonEnabled: boolean = true;

  displayedColumns = ['Task Name', 'Status', 'Due Date'];

  public dataSource = new MatTableDataSource<ITaskItem>();

  public data: ITaskItem[] = [];

  public taskData: Record<string, ITaskItem[]> = {};

  public dataName: ItemDashboard = ItemDashboard.Family;
  //dataService = inject(TaskDataService);
  public dataService: TaskDataService;


  constructor(private taskgroupService: TaskGroupService, private taskItemService: TaskItemService, private taskDataService: TaskDataService, private dialog: MatDialog) {

    this.taskItemService = this.taskItemService;
    this.dataService = this.taskDataService;
    this.deleteButtonEnabled = true;
    this.editButtonEnabled = true;
    this.addButtonEnabled = false;
    this.taskgroupService = this.taskgroupService;
    this.isChecked = false;
   
  }

  ngOnInit(): void {


    this.dataService.groupData.subscribe(
      (msg) => (this.taskGroups = msg)

    );

    // for table output
    this.dataService.taskdata.subscribe(
      (msg) => (this.dataSource.data = msg)

    );


    this.dataService.taskdata.subscribe(
      (msg) => (this.data = msg)

    );

    this.dataService.dataname.subscribe(
      (msg) => (this.dataName = msg)
    );
  }

  addTaskDialog() {
    /* 
      Creates your dialog modal
    */
    // To disable closing the modal when clicking outside the modal area
    this.addItem = new TaskItem();
    const mdConfig = new MatDialogConfig();
    mdConfig.disableClose = true;
    mdConfig.width = "1000px"
    mdConfig.data = { itemData: this.addItem };

    const dialogRef = this.dialog.open(AddTaskDialogComponent, mdConfig);

    /* 
      Handles what happens after the modal dialog is closed
    */
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // do something

        this.dataSource.data = [result, ...this.dataSource.data]
        this.taskItemEvent.emit(result);
        //this.taskgroupService.getTaskgroups().subscribe({
        //  next: data => {
        //    this.taskItemEvent.emit(result);
        //  }
        //});
      }
    });
  }

  editTaskDialog() {
    /* 
      Creates your dialog modal
    */
    // To disable closing the modal when clicking outside the modal area
   
    if (this.checkedBoxIds.length > 1) {

      this.openAlertDialog()
    }
    else {

      var itemId = this.checkedBoxIds.pop();
  
      for (var item in this.data) {
        
        if (this.data[item].id == itemId) {
          this.editItem = this.data[item] as TaskItem;
     
        }
      }
      const mdConfig = new MatDialogConfig();
      mdConfig.disableClose = true;
      mdConfig.width = "1000px"
      mdConfig.data = { itemData: this.editItem};

      const dialogRef = this.dialog.open(EditTaskDialogComponent, mdConfig);

      /* 
        Handles what happens after the modal dialog is closed
      */
      dialogRef.afterClosed().subscribe(result => {
        console.log('after edit close result ' + result)
        //this.deleteButtonEnabled = true;
        //this.addButtonEnabled = false;
        //this.editButtonEnabled = true;
    
        if (!result) {
          console.log('check result after close ' + result.name)
          this.isChecked = false;
          this.taskItemEvent.emit(result);

    

        }
      });
    }

  }

  deleteTaskDialog() {

      const mdConfig = new MatDialogConfig();
      mdConfig.disableClose = true;
      mdConfig.width = "1000px"
      mdConfig.data = { tgGroups:this.taskGroups, deleteIds: this.checkedBoxIds, dataSource: this.dataSource };

      const dialogRef = this.dialog.open(DeleteTaskDialogComponent, mdConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // do something

        this.deleteButtonEnabled = true;
        this.addButtonEnabled = false;
        this.editButtonEnabled = true;
        //this.dataSource.data = [result, ...this.dataSource.data]
        this.taskGroupsEvent.emit(result);
        //this.taskgroupService.getTaskgroups().subscribe({
        //  next: data => {
        //    this.taskItemEvent.emit(result);
        //  }
        //});
      }
    });
    }

  openAlertDialog() {
    const mdConfig = new MatDialogConfig();
    mdConfig.disableClose = true;
    mdConfig.width = "1000px"
    const alertDialogRef = this.dialog.open(AlertDialogComponent, mdConfig);
  }

  update(checked: boolean, index: number) {
    if (checked == true) {
      this.checkedBoxIds.push(index);
      this.deleteButtonEnabled = false;
      this.editButtonEnabled = false;
      this.addButtonEnabled = true;
    }
    else {
      if (this.checkedBoxIds.length != 0) {
        this.checkedBoxIds.pop();
      }
      if (this.checkedBoxIds.length == 0) {
        this.deleteButtonEnabled = true;
        this.editButtonEnabled = true;
        this.addButtonEnabled = false;
      }

    }
  }

  deleteTask() {
    if (this.checkedBoxIds.length == 1) {
      var id = this.checkedBoxIds.pop();
      this.taskItemService.deleteTaskItem(id).subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter(
          (item: ITaskItem) => item.id !== id)
      })
    }
    else {
      this.checkedBoxIds.forEach(value => {
        this.taskItemService.deleteTaskItem(value).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(
            (item: ITaskItem) => item.id !== value)
        })
      } )
    }

    this.deleteButtonEnabled = true;
    this.addButtonEnabled = false;

  }

}
