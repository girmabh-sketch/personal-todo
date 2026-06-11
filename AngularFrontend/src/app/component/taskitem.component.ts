import { Component, ElementRef, OnInit } from '@angular/core';
import { TaskDataService } from '../service/taskdata.service';
import { TaskItemService } from '../service/taskitem.service';
import { TaskItem } from '../models/taskitem';

@Component({
  selector: 'app-todotask',
  templateUrl: './taskitem.component.html',
  styleUrls: ['./taskitem.component.css']
})
export class TaskItemComponent implements OnInit {

  public taskitems: TaskItem[] = [];
  error: string | null = null;

  constructor(private taskitemService: TaskItemService, private dataService: TaskDataService, private _elementRef: ElementRef) { }

  //ngOnInit() {
  //  this.todotaskService.getTodotasks()
  //    .subscribe(todotasks => this.todotasks = todotasks);
  //}
  ngOnInit(): void {
    this.taskitemService.getTaskItems().subscribe({
      next: data => {
        this.taskitems = data;
        this.error = null;  // Clear any previous error messages
      },
      error: err => {
        this.error = 'Could not fetch to do tasks data. Please try again later.';
      }
    });
  }

  //onTodotaskSelected(id: number) {
  //  this.selectedTodotask = null;
  //  this.todotaskService.getTodotask(id)
  //    .subscribe(todotask => this.selectedTodotask = todotask);
  //}
}
