//// src/app/todotask.service.ts
//import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
//import { Observable } from 'rxjs';

//@Injectable({
//  providedIn: 'root'
//})
//export class TodotaskService {

//  private apiUrl: string = 'https://localhost:7204/api/todotasks';

//  constructor(private http: HttpClient) { }

//  getAll(): Observable<any> {
//    console.log('hello service');
//    return this.http.get(this.apiUrl);
//  }
//}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TaskItem} from "../models/taskitem";

import { environment } from '../environments/environment';
import { ITaskItem } from '../models/taskitem.interface';

@Injectable()
export class TaskItemService {

  private apiUrl = environment.apiUrl + 'taskitems';

  constructor(private http: HttpClient) { }

  getTaskItems(): Observable<TaskItem[]> {
   // console.log('service called');
    return this.http.get<TaskItem[]>(this.apiUrl);
  }

  getTaskItem(id: number): Observable<TaskItem> {
    return this.http.get<TaskItem>(`${this.apiUrl}/${id}`);
  }

  postTaskItem(item: ITaskItem): Observable<TaskItem> {
    console.log('post in taskitem service')
    return this.http.post<TaskItem>(`${this.apiUrl}`,item);
  }

  putTaskItem(id:number,item: ITaskItem): Observable<TaskItem> {
    console.log('put in taskitem service')
    return this.http.put<TaskItem>(`${this.apiUrl}/${id}`, item);
  }
  deleteTaskItem(id?: number): Observable<TaskItem> {
    return this.http.delete<TaskItem>(`${this.apiUrl}/${id}`);
  }
  deleteTaskItems(ids: number[]) {

    //return this.http.delete<TaskItem>(`${this.apiUrl}/${id}`);
  }
}
