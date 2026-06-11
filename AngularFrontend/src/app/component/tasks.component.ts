import { Component, OnInit } from '@angular/core';
import { TaskItem } from '../models/taskitem';
import { TaskGroup } from '../models/taskgroup';
import { TaskDataService } from '../service/taskdata.service';
import { TaskGroupService } from '../service/taskgroup.service';
import { ITaskItem } from '../models/taskitem.interface';
import { ItemDashboard, ItemPriority, ItemStatus, ItemType } from '../utils/enum.types';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  public ItemDashboard = ItemDashboard;
  //public enum_Type = ItemType;
  
  public taskgroups: TaskGroup[] = [];
  public taskItems: ITaskItem[] = [];
  public plannedItems: ITaskItem[] = [];
  public importantItems: ITaskItem[] = [];
  public myDayItems: ITaskItem[] = [];
  public numberOfTasks: number = 0;
  public allTaskData: Record<string, ITaskItem[]> = {};
  public tasksData: Record<string, ITaskItem[]> = {};
  public numberOfMyDayTasks: number = 0;
  public numberOfPlannedTasks: number = 0;
  public numberOfImportantTasks: number = 0;
  error: string | null = null;
  public dataService: TaskDataService;
  displayedColumns = ['Category Name', 'Number of Tasks'];
  items = [{ 'name': 'abebe', 'id': 2 }, { 'name': 'abebe2', 'id': 2 }, { 'name': 'abebe2', 'id': 3 }];
  constructor(private taskgroupService: TaskGroupService, private taskDataService: TaskDataService) {

    this.dataService = this.taskDataService;
    this.allTaskData[ItemDashboard.Tasks] = [];
    //this.taskgroups = [
    //  {
    //    "id": 1,
    //    "type": 0,
    //    "taskItems": [
    //      { "name": "Shopping", "taskGroupId": 1, "status": 0, "created": new Date("2025-07-04T10:00:00"), "planned": new Date(0), "priority": 2 },
    //      { "name": "Travel", "taskGroupId": 1, "status": 1, "created": new Date("2025-07-04T10:00:00"), "planned": new Date("2026-05-18T10:00:00"), "priority": 2 },
    //    ]
    //  },
    //  {
    //    "id": 2,
    //    "type": 1,
    //    "taskItems": [
    //      { "name": "Sport", "taskGroupId": 2, "status": 0, "created": new Date("2025-07-04T10:00:00"), "planned": new Date(0), "priority": 2 },
    //      { "name": "Visit", "taskGroupId": 2, "status": 0, "created": new Date("2025-07-04T10:00:00"), "planned": new Date("2026-05-18T10:00:00"), "priority": 0 },
    //    ]
    //  }
    //]

    this.taskgroupService.getTaskgroups().subscribe({
      next: data => {
        this.taskgroups = data;
        this.allTaskData[ItemDashboard.Tasks] = [];
        for (var tg in this.taskgroups) {
          this.numberOfTasks += this.taskgroups[tg].taskItems.length;

          this.allTaskData[ItemDashboard.Tasks] = this.allTaskData[ItemDashboard.Tasks].concat(this.taskgroups[tg].taskItems);
          this.allTaskData[ItemDashboard.Planned] = [];
          this.allTaskData[ItemDashboard.Important] = [];
          this.allTaskData[ItemDashboard.Today] = [];
          this.taskgroups[tg].taskItems.forEach(value => {
            if (value.planned != null) {
              var planned_date = new Date(value.planned);

              if (value.status == ItemStatus.Planned) {
                this.plannedItems.push(value);
                this.numberOfPlannedTasks++;               
                var today_Date = new Date().toDateString();
                if (planned_date.toDateString() == today_Date) {
                  this.myDayItems.push(value);
                  this.numberOfMyDayTasks++;
                }
                if (value.priority.valueOf() == ItemPriority.High) {
                  this.importantItems.push(value);

                  this.numberOfImportantTasks++;
                }
              }
            }

          })
      
          this.allTaskData[ItemDashboard.Today] = this.myDayItems;
          this.allTaskData[ItemDashboard.Planned] = this.plannedItems;
          this.allTaskData[ItemDashboard.Important] = this.importantItems;
          this.updateData(this.allTaskData[ItemDashboard.Today], ItemDashboard.Today);


        }
        this.error = null;  // Clear any previous error messages
      },
      error: err => {
        this.error = 'Could not fetch to do tasks data. Please try again later.';
      }
    });



    //for (var tg in this.taskgroups) {
    //  this.numberOfTasks += this.taskgroups[tg].taskItems.length;

    //  this.allTaskData[ItemDashboard.Tasks] = this.allTaskData[ItemDashboard.Tasks].concat(this.taskgroups[tg].taskItems);
    //  this.allTaskData[ItemDashboard.Planned] = [];
    //  this.allTaskData[ItemDashboard.Important] = [];
    //  this.allTaskData[ItemDashboard.Today] = [];
    //  this.taskgroups[tg].taskItems.forEach(value => {
    //    if (value.status == ItemStatus.Planned) {
    //      this.plannedItems.push(value);
    //      this.numberOfPlannedTasks++;

    //      if (value.planned.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0)) {
    //        this.myDayItems.push(value);
    //        this.numberOfMyDayTasks++;
    //      }
    //      console.log(value.priority)
    //      if (value.priority == ItemPriority.High) {
    //        this.importantItems.push(value);

    //        this.numberOfImportantTasks++;
    //      }
    //    }

    //  })
    //  console.log("number of my day " + this.numberOfMyDayTasks)
    //  this.allTaskData[ItemDashboard.Planned] = this.plannedItems;
    //  this.allTaskData[ItemDashboard.Important] = this.importantItems;
    //  this.updateData(this.allTaskData[ItemDashboard.Today], ItemDashboard.Today);
   

    //}

  }

  ngOnInit(): void {

    //this.taskgroups = [
    //  {
    //    "id": 1,
    //    "type": 0,
    //    "taskItems": [
    //      { "name": "Shopping", "taskGroupId": 1, "status": 0, "created": new Date("2025-07-04T10:00:00"), "planned": new Date(), "priority":2 },
    //      { "name": "Travel", "taskGroupId": 1, "status": 1, "created": new Date("2025-07-04T10:00:00"), "planned": new Date("2026-05-18T10:00:00"), "priority": 2 },
    //    ]
    //  },
    //  {
    //    "id": 2,
    //    "type": 1,
    //    "taskItems": [
    //      { "name": "Sport", "taskGroupId": 2, "status": 0, "created": new Date("2025-07-04T10:00:00"), "planned": new Date(), "priority": 2 },
    //      { "name": "Visit", "taskGroupId": 2, "status": 0, "created": new Date("2025-07-04T10:00:00"), "planned": new Date("2026-05-18T10:00:00"), "priority": 0 },
    //    ]
    //  }
    //]


    //for (var tg in this.taskgroups) {
    //  this.numberOfTasks += this.taskgroups[tg].taskItems.length;
    //  this.allTaskData["Tasks"] = this.taskgroups[tg].taskItems;

    //  this.taskgroups[tg].taskItems.forEach(value => {
    //    if (value.status == ItemStatus.Planned) {
    //      this.numberOfPlannedTasks++;
    //      this.myDayItems.push(value);
    //      if (value.planned.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0)) {

    //        this.numberOfMyDayTasks++;
    //      }
    //      console.log(value.priority)
    //      if (value.priority == ItemPriority.High) {
    //        this.importantItems.push(value);

    //        this.numberOfImportantTasks++;
    //      }
    //    }

    //  })



    //}



    //this.taskgroupService.getTaskgroups().subscribe({
    //  next: data => {
    //    this.taskgroups = data;
    //    for (var tg in this.taskgroups){
    //      this.numberOfTasks += this.taskgroups[tg].taskItems.length;
    //      if (this.taskgroups[tg].type == ItemType.Family) {
    //        this.taskItems = this.taskgroups[tg].taskItems;

    //      }

    //    }
    //    this.updateSharedGroupData(this.taskgroups);
    //    this.updateTaskData(this.taskItems, ItemType.Family) ;
    //    this.error = null;  // Clear any previous error messages
    //  },
    //  error: err => {
    //    this.error = 'Could not fetch to do tasks data. Please try again later.';
    //  }
    //});
  }

  updateData(data: ITaskItem[], dataName: ItemDashboard) {

    this.taskDataService.updateData(data, dataName);

  }
  updateSharedGroupData(groups: TaskGroup[]) {
    this.taskDataService.updateSharedGroupData(groups);
  }

  updateSharedData(groups: TaskGroup[], data: ITaskItem[]) {
    this.taskDataService.updateSharedData(groups,data);
  }

  updateTaskData(data: ITaskItem[], groupName: ItemDashboard) {
    console.log("update task data")
    for (var tg in data) {
      console.log(data[tg]);

    }
    this.taskDataService.updateTaskData(data, groupName);
  }


}
