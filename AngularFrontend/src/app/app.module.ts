import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTableModule }from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { TaskItemComponent } from '../app/component/taskitem.component';
import { TaskItemService } from '../app/service/taskitem.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { TypeEnumValuePipe } from './transformers/taskgrouptype.pipe';
import { StatusEnumValuePipe } from './transformers/tasktype.pipe';
import { TaskGroupService } from './service/taskgroup.service';
import { TaskGroupComponent } from './component/taskgroup.component';
import { TasksComponent } from './component/tasks.component';
import { TaskListComponent } from './component/tasklist.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AddTaskDialogComponent } from './component/addtaskdialog.component';
import { EditTaskDialogComponent } from './component/edittaskdialog.component';
import { AlertDialogComponent } from './component/alertdialog.component';

import { TypeDashboardEnumValuePipe } from './transformers/taskDashboard.pipe';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from '@angular/material/core';
import { PriorityEnumValuePipe } from './transformers/taskpriority.pipe';


@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TaskGroupComponent,
    TaskListComponent,
    TypeEnumValuePipe,
    StatusEnumValuePipe,
    TypeDashboardEnumValuePipe,
    PriorityEnumValuePipe,
    AddTaskDialogComponent,
    EditTaskDialogComponent,
    AlertDialogComponent
    
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSlideToggle,
    MatIconModule,
    MatDialogModule,
    HttpClientModule
  ],
  exports: [
    TypeEnumValuePipe, StatusEnumValuePipe
  ],
  providers: [TaskItemService, TaskGroupService, MatDatepickerModule, MatSelectModule, MatCheckboxModule, MatDialogModule, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
