import {
  Component,
  effect,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TasksDataService } from '../../../services/tasks.data.service';
import { DateValidator } from '../../../helper/date-validator';
import { Task, TaskStatus } from '../../../models/task.model';

@Component({
  selector: 'app-add-edit-task-form',
  templateUrl: './add-edit-task-form.component.html',
  styleUrl: './add-edit-task-form.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class AddEditTaskFormComponent implements OnInit {
  readonly task = input<Task | null>(null);
  readonly submit = input<boolean>(false);
  readonly formIsVald = output<boolean>();
  readonly close = output();

  private readonly _formBuilder = inject(FormBuilder);
  private readonly _tasksService = inject(TasksDataService);

  readonly availabeStatus: TaskStatus[] = ['Planned', 'Pending', 'Completed'];
  readonly minDate: string = new Date().toISOString().split('T')[0];

  form: FormGroup = new FormGroup({});

  constructor() {
    effect(() => {
      if (this.submit()) {
        this.submitForm();
      }
    });
  }

  ngOnInit(): void {
    const task = this.task();
    this.form = this._formBuilder.group({
      name: [task ? task.name : '', Validators.required],
      status: [task ? task.status : 'Planned', Validators.required],
      date: [
        task ? task.date : null,
        [Validators.required, DateValidator.LessThanToday],
      ],
      description: [task?.description ? task.description : ''],
    });

    if (task) {
      this.form.markAllAsTouched();
      this.formIsVald.emit(this.form.valid);
    }

    this.form.statusChanges.subscribe((formStatus) => {
      this.formIsVald.emit(formStatus === 'VALID');
    });
  }

  submitForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const task = {
      taskId: this.task()?.taskId,
      ...this.form.value,
    };

    if (!this.task()) {
      this._tasksService.addTask(task);
    } else {
      this._tasksService.editTask(task);
    }
    this.close.emit();
  }
}
