import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '../../../../../reducers';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import {  MonthlyTaskAppliedQuarterlyActionTypes,
    MonthlyTaskAppliedQuarterlyAdded,
    MonthlyTaskAppliedQuarterlyCreateSubmitted,
    MonthlyTaskAppliedQuarterlyCreationCancelled,
    MonthlyTaskAppliedQuarterlyDeletionCancelled,
    MonthlyTaskAppliedQuarterlyDeletionRequested,
    MonthlyTaskAppliedQuarterlyDeletionSaved,
    MonthlyTaskAppliedQuarterlysLoaded,
    MonthlyTaskAppliedQuarterlysRequestCancelled,
    MonthlyTaskAppliedQuarterlysRequested
} from './monthly-applied-quarterly.actions';

import { MonthlyTaskService } from '../../service/monthly-task.service';

@Injectable()
export class MonthlyTaskAppliedQuarterlysEffects {


    deleteMonthlyTaskAppliedQuarterly$ = createEffect(() => {
        return this.actions$
          .pipe(
            ofType<MonthlyTaskAppliedQuarterlyDeletionRequested>(
              MonthlyTaskAppliedQuarterlyActionTypes.MonthlyTaskAppliedQuarterlyDeletionRequested
            ),
            mergeMap(action => this.monthlyTaskService
              .deleteMonthlyTaskSchedulerAppliedQuarterly(action.payload.id)
              .pipe(
                map(deletionResponse => new MonthlyTaskAppliedQuarterlyDeletionSaved(
                  deletionResponse
                )),
                catchError(err => {
                  this.store.dispatch(
                    new MonthlyTaskAppliedQuarterlyDeletionCancelled({ err })
                  );
                  return of();
                })
              )
            )
          )
      });


    fetchMonthlyTasksAppliedQuarterlys$ = createEffect(() => {
        return this.actions$
          .pipe(
            ofType<MonthlyTaskAppliedQuarterlysRequested>(
                MonthlyTaskAppliedQuarterlyActionTypes.MonthlyTaskAppliedQuarterlysRequested
            ),
            mergeMap(action => this.monthlyTaskService
                .fetchMonthyTaskAppliedQuarterlysByQuarter(
                    action.payload.quarter, action.payload.year
                )
              .pipe(
                map(monthlyTasks => new MonthlyTaskAppliedQuarterlysLoaded(
                    { monthlyTasks }
                )),
                catchError(err => {
                  this.store.dispatch(
                    new MonthlyTaskAppliedQuarterlysRequestCancelled({ err })
                  );
                  return of();
                })
              )
            )
          )
      });

      submitMonthlyTaskAppliedQuarterly$ = createEffect(() => {
        return this.actions$
          .pipe(
            ofType<MonthlyTaskAppliedQuarterlyCreateSubmitted>(
                MonthlyTaskAppliedQuarterlyActionTypes.MonthlyTaskAppliedQuarterlyCreateSubmitted
            ),
            mergeMap(action => this.monthlyTaskService
              .applyMonthlySchedulerToQuarterAndYear(
                action.payload.monthlyTaskAppliedQuarterly,
              ).pipe(catchError(err => {
                this.store.dispatch(
                  new MonthlyTaskAppliedQuarterlyCreationCancelled({ err })
                );
                return of();
              }),
            )),
            map(
              monthlyTaskAppliedQuarterly => new MonthlyTaskAppliedQuarterlyAdded(
                { monthlyTaskAppliedQuarterly }
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

