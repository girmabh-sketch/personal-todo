import { Component, ElementRef, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { TaskGroupService } from '../service/taskgroup.service';
import { TaskGroup } from '../models/taskgroup';
import { ITaskItem } from '../models/taskitem.interface';
import { TaskDataService } from '../service/taskdata.service';
import { ItemDashboard, ItemStatus, ItemType } from '../utils/enum.types';
import { TaskItem } from '../models/taskitem';

@Component({
  selector: 'task-group',
  templateUrl: './taskgroup.component.html',
  styleUrls: ['./taskgroup.component.css']
})
export class TaskGroupComponent implements OnInit {

  public taskgroups: TaskGroup[] = [];
  public numberOfTasks: number = 0;
  public numberOfMyDayTasks: number = 0;
  public numberOfPlannedTasks: number = 0;
  error: string | null = null;
  public dataService: TaskDataService;
  displayedColumns = ['Category Name', 'Number of Tasks'];
  constructor(private taskgroupService: TaskGroupService, private taskDataService: TaskDataService) {

    this.dataService = this.taskDataService;
  }

  ngOnInit(): void {

    console.log("ngOnInit");

    this.taskgroups = [
      {
        "id": 1,
        "type": 0,
        "taskItems": [
          { "name": "Shopping", "taskGroupId": 1, "status": 0, "created": new Date("2025-07-04T10:00:00"), "planned": new Date(), "priority": 2 },
          { "name": "Travel", "taskGroupId": 1, "status": 1, "created": new Date("2025-07-04T10:00:00"), "planned": new Date("2026-05-18T10:00:00"), "priority": 2 },
        ]
      },
      {
        "id": 2,
        "type": 1,
        "taskItems": [
          { "name": "Sport", "taskGroupId": 2, "status": 0, "created": new Date("2025-07-04T10:00:00"), "planned": new Date(), "priority": 2 },
          { "name": "Visit", "taskGroupId": 2, "status": 0, "created": new Date("2025-07-04T10:00:00"), "planned": new Date("2026-05-18T10:00:00"), "priority": 0 },
        ]
      }
    ]

    //this.taskgroups = this.taskDataService.sharedGroupData();
    this.numberOfTasks = this.taskgroups.length;
    for (var tg in this.taskgroups) {
      this.taskgroups[tg].taskItems.forEach(value => {
        if (value.status == ItemStatus.Planned) {
          this.numberOfPlannedTasks++;
        }
      })

      

    }
    console.log("ngOnInit " + this.numberOfTasks);
  }

  updateTaskData(data: ITaskItem[], groupName: ItemDashboard) {
    this.taskDataService.updateTaskData(data, groupName);
  }

}
