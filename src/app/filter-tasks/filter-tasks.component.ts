import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { TasksDataService } from '../services/tasks.data.service';
import { TaskStatus } from '../models/task.model';

@Component({
  selector: 'app-filter-tasks',
  templateUrl: './filter-tasks.component.html',
  styleUrl: './filter-tasks.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class FilterTasksComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  readonly tasksService = inject(TasksDataService);

  form: FormGroup = new FormGroup({});
  readonly availabeStatus: TaskStatus[] = ['Planned', 'Pending', 'Completed'];

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: [null],
      date: [null],
      status: ['all'],
    });

    this.form.valueChanges.pipe(debounceTime(200)).subscribe((filters) => {
      this.tasksService.applyFilters(filters);
    });
  }
}
