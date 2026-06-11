import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskItemComponent } from '../app/component/taskitem.component';
import { TaskGroupComponent } from '../app/component/taskgroup.component';
import { TasksComponent } from './component/tasks.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full'
  },
  {
    path: 'tasks',
    component: TasksComponent
  },
  //{
  //  path: 'todotaskgroup',
  //  component: TodotaskgroupComponent
  //},
  //{
  //  path: 'todotask',
  //  component: TodotaskComponent
  //}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
