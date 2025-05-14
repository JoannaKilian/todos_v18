import { Component, inject } from '@angular/core';
import { TasksDataService } from '../services/tasks.data.service';
import { TaskComponent } from './components/task/task.component';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
  standalone: true,
  imports: [TaskComponent, AsyncPipe],
})
export class TasksComponent {
  readonly tasksService = inject(TasksDataService);
}
