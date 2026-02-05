import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';


import {
  ApplyBatchSchedulerModel
} from 'src/app/models/apply-batch-schedulers-request.model';
import { 
  IntervalTaskGroupAppliedQuarterlyModel 
} from 'src/app/models/interval-task-group.model';
import { IntervalTaskGroupModel } from 'src/app/models/interval-task-group.model';
import {
  intervalTaskGroupAppliedQuarterlysErrorMsg,
  intervalTaskGroupAppliedQuarterlysSuccessMsg
} from '../../state/groups-applied-quarterly/interval-task-group-applied-quarterly.selectors';
import {
  IntervalTaskGroupAppliedQuarterlyCreateSubmitted,
  IntervalTaskGroupAppliedQuarterlyCreationCancelled,
  IntervalTasksAppliedQuarterlyMessagesCleared
} from '../../state/groups-applied-quarterly/interval-task-group-applied-quarterly.actions';
import {
  IntervalTaskGroupAppliedQuarterlysState
} from '../../state/groups-applied-quarterly/interval-task-group-applied-quarterly.reducers';
import { 
  selectAllIntervalTaskGroups 
} from '../../state/interval-task-groups/interval-task-group.selectors';
import { 
  IntervalTaskGroupsState 
} from '../../state/interval-task-groups/interval-task-group.reducers';


@Component({
  selector: 'app-apply-interval-task-group-form',
  standalone: false,
  templateUrl: './apply-interval-task-group-form.component.html',
  styleUrl: './apply-interval-task-group-form.component.css'
})
export class ApplyIntervalTaskGroupFormComponent implements OnInit {

  intervalTaskGroups$: Observable<IntervalTaskGroupModel[] | undefined> = of(undefined);
  @Input() quarter:string;
  @Input() year:number;
  errMsg$: Observable<string | undefined>;
  successMsg$: Observable<string | undefined>;

  constructor(
    private store: Store<IntervalTaskGroupAppliedQuarterlysState>,
    private intervalTasksStore: Store<IntervalTaskGroupsState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(
      new IntervalTasksAppliedQuarterlyMessagesCleared()
    );
    this.errMsg$ = this.store.pipe(
      select(intervalTaskGroupAppliedQuarterlysErrorMsg)
    );
    this.successMsg$ = this.store.pipe(
      select(intervalTaskGroupAppliedQuarterlysSuccessMsg)
    );
    this.intervalTaskGroups$ = this.intervalTasksStore.pipe(
      select(selectAllIntervalTaskGroups)
    );
  }

  onClearStatusMsgs() {
    this.store.dispatch(new IntervalTasksAppliedQuarterlyMessagesCleared());
  }

  onSubmitITGAQ(form: NgForm) {

    if (form.invalid) {
      this.store.dispatch(new IntervalTaskGroupAppliedQuarterlyCreationCancelled({err: {
        error: {
          message: "The form values were not properly filled in!"
        }
      }} ));
      form.reset();
    }
    let submissionForm: ApplyBatchSchedulerModel = {
        recurringTaskSchedulerId: form.value.intervalTaskGroup,
        quarter: this.quarter,
        year: this.year
    }
    console.log(submissionForm);
    this.store.dispatch(new IntervalTaskGroupAppliedQuarterlyCreateSubmitted(
      { intervalTaskGroupAppliedQuarterly: submissionForm }
    ));
    form.reset();
    }
  }

