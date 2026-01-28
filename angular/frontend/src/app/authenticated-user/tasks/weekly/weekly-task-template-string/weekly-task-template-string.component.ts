import { Component, OnInit, Input } from '@angular/core';
import { of, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import {
  WeeklyTasksState
} from '../state/weekly-schedulers/weekly-task.reducers';
import { WeeklyTaskModel } from 'src/app/models/weekly-task.model';
import {
  selectWeeklyTaskSchedulerById
} from '../state/weekly-schedulers/weekly-task.selectors';

@Component({
  selector: 'app-weekly-task-template-string',
  standalone: false,
  templateUrl: './weekly-task-template-string.component.html',
  styleUrl: './weekly-task-template-string.component.css'
})
export class WeeklyTaskTemplateStringComponent implements OnInit {

  weeklyTask$: Observable<WeeklyTaskModel | undefined> = of(undefined);
  @Input() weeklyTaskId: number;

  ngOnInit(): void {
    this.weeklyTask$ = this.store.pipe(select(
      selectWeeklyTaskSchedulerById(this.weeklyTaskId)
    ));
  }

  constructor(
    private store: Store<WeeklyTasksState>
  ) {}

}

