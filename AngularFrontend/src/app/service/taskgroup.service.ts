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
import { TaskGroup } from "../models/taskgroup";

import { environment } from '../environments/environment';

@Injectable()
export class TaskGroupService {

  private apiUrl = environment.apiUrl + 'taskgroups';

  constructor(private http: HttpClient) { }

  getTaskgroups(): Observable<TaskGroup[]> {
    //console.log('service called');
    return this.http.get<TaskGroup[]>(this.apiUrl);
  }

  getTaskgroup(id: number): Observable<TaskGroup> {
    return this.http.get<TaskGroup>(`${this.apiUrl}/${id}`);
  }
}
