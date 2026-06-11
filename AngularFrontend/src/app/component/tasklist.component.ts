import { Component, inject, OnInit} from '@angular/core';
import { TaskDataService } from '../service/taskdata.service';
import { TaskItem } from '../models/taskitem';
import { ITaskItem } from '../models/taskitem.interface';
import { ItemDashboard, ItemType } from '../utils/enum.types';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table'
import { AddTaskDialogComponent } from './addtaskdialog.component';
import { TaskItemService } from '../service/taskitem.service';
import { EditTaskDialogComponent } from './edittaskdialog.component';
import { AlertDialogComponent } from './alertdialog.component';


@Component({
  selector: 'task-list',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})

export class TaskListComponent implements OnInit {
  public enum_Type = ItemType;

  public ItemDashboard = ItemDashboard;
  public editItem: TaskItem = new TaskItem();
;
  public checkedBoxId: number[] = [];

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


  constructor(private taskItemService: TaskItemService, private taskDataService: TaskDataService, private dialog: MatDialog) {

    this.taskItemService = this.taskItemService;
    this.dataService = this.taskDataService;
    this.deleteButtonEnabled = true;
    this.editButtonEnabled = true;
    this.addButtonEnabled = false;
  }

  ngOnInit(): void {

    this.dataService.taskdata.subscribe(
      (msg) => (this.dataSource.data = msg)

    );


    this.dataService.taskdata.subscribe(
      (msg) => (this.data = msg)

    );

    this.dataService.dataname.subscribe(
      (msg) => (this.dataName = msg)
    );

    console.log("data nam " + this.dataName)

    //this.data = this.dataService.sharedData();
    //this.dataName = this.dataService.sharedDataName();


  }

  addTaskDialog() {
    /* 
      Creates your dialog modal
    */
    // To disable closing the modal when clicking outside the modal area
    const mdConfig = new MatDialogConfig();
    mdConfig.disableClose = true;
    mdConfig.width = "1000px"
   
    const dialogRef = this.dialog.open(AddTaskDialogComponent, mdConfig);

    /* 
      Handles what happens after the modal dialog is closed
    */
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // do something
        console.log("after close")
        console.log(`Dialog result: $ {
      JSON.stringify(result)
    }`);
      }
    });
  }

  editTaskDialog() {
    /* 
      Creates your dialog modal
    */
    // To disable closing the modal when clicking outside the modal area
   
    console.log('edit')
    if (this.checkedBoxId.length > 1) {
      this.openAlertDialog()
    }
    else {

      var itemId = this.checkedBoxId.pop();
     
      
      console.log(this.data.length)
      for (var item in this.data) {
        
        if (this.data[item].id == itemId) {
          console.log('item found')
          this.editItem = this.data[item] as TaskItem;
          console.log(this.editItem)
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
        if (result) {
          // do something
          console.log("after close")
          console.log(`Dialog result: $ {
      JSON.stringify(result)
    }`);
        }
      });
    }

  }

  openAlertDialog() {
    const mdConfig = new MatDialogConfig();
    mdConfig.disableClose = true;
    mdConfig.width = "1000px"
    const alertDialogRef = this.dialog.open(AlertDialogComponent, mdConfig);
  }

  update(checked: boolean, index: number) {

    if (checked == true) {
      this.checkedBoxId.push(index);
      this.deleteButtonEnabled = false;
      this.editButtonEnabled = false;
      this.addButtonEnabled = true;
    }
    else {
      if (this.checkedBoxId.length != 0) {
        this.checkedBoxId.pop();
      }
      if (this.checkedBoxId.length == 0) {
        this.deleteButtonEnabled = true;
        this.editButtonEnabled = true;
        this.addButtonEnabled = false;
      }

    }
  }

  deleteTask() {
    if (this.checkedBoxId.length == 1) {
      var id = this.checkedBoxId.pop();
      this.taskItemService.deleteTaskItem(id).subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter(
          (item: ITaskItem) => item.id !== id)
      })
    }
    else {
      this.checkedBoxId.forEach(value => {
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
