import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';


import { 
  MonthlyTaskAppliedQuarterlysState 
} from '../../state/schedulers-applied-quarterly/monthly-applied-quarterly.reducers';
import { ApplyMonthlyTaskSchedulerModel } from 'src/app/models/monthly-task.model';
import { MonthlyTaskModel } from 'src/app/models/monthly-task.model';
import { 
  monthlyTaskAppliedQuarterlysErrorMsg,
  monthlyTaskAppliedQuarerlysSuccessMsg 
} from '../../state/schedulers-applied-quarterly/monthly-applied-quarterly.selectors';
import { 
  MonthlyTaskAppliedQuarterlyCreateSubmitted,
  MonthlyTaskAppliedQuarterlyCreationCancelled,
  MonthlyTasksAppliedQuarterlyMessagesCleared
} from '../../state/schedulers-applied-quarterly/monthly-applied-quarterly.actions';
import { 
  MonthlyTasksState 
} from '../../state/monthly-schedulers/monthly-task.reducers';
import { 
  selectAllMonthlyTaskSchedulers 
} from '../../state/monthly-schedulers/monthly-task.selectors';


@Component({
  selector: 'app-apply-monthly-scheduler-form',
  standalone: false,
  templateUrl: './apply-monthly-scheduler-form.component.html',
  styleUrl: './apply-monthly-scheduler-form.component.css'
})
export class ApplyMonthlySchedulerFormComponent implements OnInit {

  monthlyTaskSchedulers$: Observable<MonthlyTaskModel[] | undefined> = of(undefined);
  @Input() quarter:string;
  @Input() year:number;
  errMsg$: Observable<string | undefined>;
  successMsg$: Observable<string | undefined>;

  constructor( 
    private store: Store<MonthlyTaskAppliedQuarterlysState>,
    private monthlyTasksStore: Store<MonthlyTasksState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(
      new MonthlyTasksAppliedQuarterlyMessagesCleared()
    );
    this.errMsg$ = this.store.pipe(
      select(monthlyTaskAppliedQuarterlysErrorMsg)
    );
    this.successMsg$ = this.store.pipe(
      select(monthlyTaskAppliedQuarerlysSuccessMsg)
    );
    this.monthlyTaskSchedulers$ = this.monthlyTasksStore.pipe(
      select(selectAllMonthlyTaskSchedulers)
    );
  }

  onClearStatusMsgs() {
    this.store.dispatch(new MonthlyTasksAppliedQuarterlyMessagesCleared());
  }

  onSubmitMTAQ(form: NgForm) {

    if (form.invalid) {
      this.store.dispatch(new MonthlyTaskAppliedQuarterlyCreationCancelled({err: {
        error: {
          message: "The form values were not properly filled in!"
        }
      }} ));
      form.reset();
    }
    let submissionForm: ApplyMonthlyTaskSchedulerModel = {
        monthly_task_scheduler: form.value.monthlyScheduler,
        quarter: this.quarter,
        year: this.year
    }
    console.log(submissionForm);
    this.store.dispatch(new MonthlyTaskAppliedQuarterlyCreateSubmitted(
      { monthlyTaskAppliedQuarterly: submissionForm }
    ));
    form.reset();
    }
  }
