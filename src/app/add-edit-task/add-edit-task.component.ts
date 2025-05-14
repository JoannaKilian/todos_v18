import { Component, input, output, signal } from '@angular/core';
import { AddEditTaskFormComponent } from './components/add-edit-task-form/add-edit-task-form.component';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrl: './add-edit-task.component.scss',
  standalone: true,
  imports: [AddEditTaskFormComponent],
})
export class AddEditTaskComponent {
  readonly task = input<Task | null>(null);
  readonly close = output();

  readonly submitClicked = signal<boolean>(false);
  formIsValid = false;

  closeEmmit() {
    this.close.emit();
  }
}
