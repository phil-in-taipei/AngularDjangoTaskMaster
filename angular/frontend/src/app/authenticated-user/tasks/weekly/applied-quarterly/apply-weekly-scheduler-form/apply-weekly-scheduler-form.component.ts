import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import {
  WeeklyTaskAppliedQuarterlysState
} from '../../state/schedulers-applied-quarterly/weekly-applied-quarterly.reducers';
//import {
// ApplyBatchSchedulerModel
//} from 'src/app/models/apply-batch-schedulers-request.model';
import { ApplyWeeklyTaskSchedulerModel } from 'src/app/models/weekly-task.model';
import { WeeklyTaskModel } from 'src/app/models/weekly-task.model';
import {
  weeklyTaskAppliedQuarterlysErrorMsg,
  weeklyTaskAppliedQuarerlysSuccessMsg
} from '../../state/schedulers-applied-quarterly/weekly-applied-quarterly.selectors';
import {
  WeeklyTaskAppliedQuarterlyCreateSubmitted,
  WeeklyTaskAppliedQuarterlyCreationCancelled,
  WeeklyTasksAppliedQuarterlyMessagesCleared
} from '../../state/schedulers-applied-quarterly/weekly-applied-quarterly.actions';
import {
  WeeklyTasksState
} from '../../state/weekly-schedulers/weekly-task.reducers';
import {
  selectAllWeeklyTaskSchedulers
} from '../../state/weekly-schedulers/weekly-task.selectors';

@Component({
  selector: 'app-apply-weekly-scheduler-form',
  standalone: false,
  templateUrl: './apply-weekly-scheduler-form.component.html',
  styleUrl: './apply-weekly-scheduler-form.component.css'
})
export class ApplyWeeklySchedulerFormComponent implements OnInit {

  weeklyTaskSchedulers$: Observable<WeeklyTaskModel[] | undefined> = of(undefined);
  @Input() quarter:string;
  @Input() year:number;
  errMsg$: Observable<string | undefined>;
  successMsg$: Observable<string | undefined>;

  constructor(
    private store: Store<WeeklyTaskAppliedQuarterlysState>,
    private weeklyTasksStore: Store<WeeklyTasksState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(
      new WeeklyTasksAppliedQuarterlyMessagesCleared()
    );
    this.errMsg$ = this.store.pipe(
      select(weeklyTaskAppliedQuarterlysErrorMsg)
    );
    this.successMsg$ = this.store.pipe(
      select(weeklyTaskAppliedQuarerlysSuccessMsg)
    );
    this.weeklyTaskSchedulers$ = this.weeklyTasksStore.pipe(
      select(selectAllWeeklyTaskSchedulers)
    );
  }

  onClearStatusMsgs() {
    this.store.dispatch(new WeeklyTasksAppliedQuarterlyMessagesCleared());
  }

  onSubmitWTAQ(form: NgForm) {

    if (form.invalid) {
      this.store.dispatch(new WeeklyTaskAppliedQuarterlyCreationCancelled({err: {
        error: {
          message: "The form values were not properly filled in!"
        }
      }} ));
      form.reset();
    }
    let submissionForm: ApplyWeeklyTaskSchedulerModel = {
        weekly_task_scheduler: form.value.weeklyScheduler,
        quarter: this.quarter,
        year: this.year
    }
    console.log(submissionForm);
    this.store.dispatch(new WeeklyTaskAppliedQuarterlyCreateSubmitted(
      { weeklyTaskAppliedQuarterly: submissionForm }
    ));
    form.reset();
    }
  }
