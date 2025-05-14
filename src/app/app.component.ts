import { Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { TasksComponent } from './tasks/tasks.component';
import { AddEditTaskComponent } from './add-edit-task/add-edit-task.component';
import { FilterTasksComponent } from './filter-tasks/filter-tasks.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    NavbarComponent,
    NgClass,
    TasksComponent,
    AddEditTaskComponent,
    FilterTasksComponent,
  ],
})
export class AppComponent {
  title = 'junior-frontend-developer-task';
  readonly showModal = signal<boolean>(false);

  closeModal(): void {
    this.showModal.set(false);
  }
}
