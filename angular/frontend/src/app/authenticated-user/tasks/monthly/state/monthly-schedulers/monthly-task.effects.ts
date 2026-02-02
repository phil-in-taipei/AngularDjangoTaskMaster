import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '../../../../../reducers';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { selectMonthlyTasksLoaded } from './monthly-task.selectors';
import {
  MonthlyTaskSchedulersActionTypes,
  MonthlyTaskSchedulerAdded,
  MonthlyTaskSchedulerCreateSubmitted,
  MonthlyTaskSchedulerCreationCancelled,
  MonthlyTaskSchedulerDeletionCancelled,
  MonthlyTaskSchedulerDeletionRequested,
  MonthlyTaskSchedulerDeletionSaved,
  MonthlyTaskSchedulersLoaded,
  MonthlyTaskSchedulersRequestCancelled,
  MonthlyTaskSchedulersRequested
} from './monthly-task.actions';
import { MonthlyTaskService } from '../../service/monthly-task.service';

@Injectable()
export class MonthlyTasksEffects {

  deleteMonthlyTaskScheduler$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType<MonthlyTaskSchedulerDeletionRequested>(
          MonthlyTaskSchedulersActionTypes.MonthlyTaskSchedulerDeletionRequested
        ),
        mergeMap(action => this.monthlyTaskService
          .deleteMonthlyTaskScheduler(action.payload.id)
          .pipe(
            map(deletionResponse => new MonthlyTaskSchedulerDeletionSaved(
              deletionResponse
            )),
            catchError(err => {
              this.store.dispatch(
                new MonthlyTaskSchedulerDeletionCancelled({ err })
              );
              return of();
            })
          )
        )
      )
  });

  fetchMonthlyTasksSchedulers$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType<MonthlyTaskSchedulersRequested>(
          MonthlyTaskSchedulersActionTypes.MonthlyTaskSchedulersRequested
        ),
        withLatestFrom(this.store.pipe(select(selectMonthlyTasksLoaded))),
        filter(([action, monthlyTasksLoaded]) => !monthlyTasksLoaded),
        mergeMap(action => this.monthlyTaskService.fetchMonthlyTaskSchedulers()
          .pipe(
            map(monthlyTasks => new MonthlyTaskSchedulersLoaded({ monthlyTasks })),
            catchError(err => {
              this.store.dispatch(
                new MonthlyTaskSchedulersRequestCancelled({ err })
              );
              return of();
            })
          )
        )
      )
  });

  submitMonthlyTaskScheduler$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType<MonthlyTaskSchedulerCreateSubmitted>(
          MonthlyTaskSchedulersActionTypes.MonthlyTaskSchedulerCreateSubmitted
        ),
        mergeMap(action => this.monthlyTaskService
          .submitMonthlyTaskScheduler(
            action.payload.monthlyTask,
          ).pipe(catchError(err => {
            this.store.dispatch(
              new MonthlyTaskSchedulerCreationCancelled({ err })
            );
            return of();
          }),
        )
        ),
        map(
          monthlyTaskScheduler => new MonthlyTaskSchedulerAdded(
            { monthlyTaskScheduler }
          ),
        )
      )
  });

  constructor(
    private actions$: Actions,
    private monthlyTaskService: MonthlyTaskService,
    private store: Store<AppState>
  ) {}
}