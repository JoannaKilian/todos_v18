import { Injectable } from '@angular/core';
import { MOCK_TASKS } from '../mock-data/tasks.mock';
import { Observable, Subject } from 'rxjs';
import * as uuid from 'uuid';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksDataService {
  private readonly _tasks = MOCK_TASKS;
  private _filters: Partial<Task> = {};

  private _tasksSubject = new Subject<Task[]>();
  readonly tasks$: Observable<Task[]> = this._tasksSubject.asObservable();

  constructor() {
    setTimeout(() => {
      this._refreshTasks();
    }, 1000);
  }

  private _refreshTasks(): void {
    let filteredTasks = this._tasks;
    if (this._filters.status && this._filters.status !== 'all') {
      filteredTasks = filteredTasks.filter(
        (task: Task) => task.status === this._filters.status
      );
    }
    if (this._filters.name) {
      const search = this._filters.name;
      filteredTasks = filteredTasks.filter((task: Task) =>
        task.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (this._filters.date) {
      filteredTasks = filteredTasks.filter((task: Task) => {
        return task.date === this._filters.date;
      });
    }

    this._tasksSubject.next(filteredTasks);
  }

  applyFilters(filters: Partial<Task>): void {
    this._filters = filters;
    this._refreshTasks();
  }

  clearFilters(): void {
    this._filters = {};
    this._refreshTasks();
  }

  addTask(task: Task): void {
    const newTask = {
      ...task,
      taskId: uuid.v4(),
    };
    this._tasks.unshift(newTask);
    this._refreshTasks();
  }

  editTask(taskToedit: Task): void {
    const index = this._tasks.findIndex(
      (task: Task) => task.taskId === taskToedit.taskId
    );
    if (index !== -1 && taskToedit.taskId) {
      this._tasks[index] = taskToedit;
      this._refreshTasks();
    }
  }

  removeTask(taskId: string): void {
    const indexToRemove = this._tasks.findIndex(
      (task: Task) => task.taskId === taskId
    );
    if (indexToRemove !== -1) {
      this._tasks.splice(indexToRemove, 1);
      this._refreshTasks();
    }
  }
}
