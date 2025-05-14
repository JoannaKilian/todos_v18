import { Component, inject, input, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { TasksDataService } from '../../../services/tasks.data.service';
import { AddEditTaskComponent } from '../../../add-edit-task/add-edit-task.component';
import { Task, TaskStatus } from '../../../models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  standalone: true,
  imports: [NgClass, AddEditTaskComponent],
})
export class TaskComponent {
  readonly task = input.required<Task>();
  private readonly _tasksService = inject(TasksDataService);

  readonly showModal = signal<boolean>(false);
  protected descVisible: boolean = false;

  toggleCompleted(): void {
    this.task().status =
      this.task().status === 'Completed' ? 'Planned' : 'Completed';
    this._tasksService.editTask(this.task());
  }

  toggleDescription(): void {
    this.descVisible = !this.descVisible;
  }

  closeModal(): void {
    this.showModal.set(false);
  }

  editTask(): void {
    this.showModal.set(true);
  }

  deleteTask(): void {
    const id = this.task().taskId;
    if (id) {
      this._tasksService.removeTask(id);
    }
  }

  getClass(status: TaskStatus): string {
    switch (status) {
      case 'Completed':
        return 'bg-success';
        break;
      case 'Pending':
        return 'bg-primary';
        break;
      default:
        return 'bg-secondary';
        break;
    }
  }
}
