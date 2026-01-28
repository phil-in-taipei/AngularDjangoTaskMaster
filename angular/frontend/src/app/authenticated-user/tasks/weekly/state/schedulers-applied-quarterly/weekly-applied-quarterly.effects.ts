import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '../../../../../reducers';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import {
    WeeklyTaskAppliedQuarterlyActionTypes,
    WeeklyTaskAppliedQuarterlyAdded,
    WeeklyTaskAppliedQuarterlyCreateSubmitted,
    WeeklyTaskAppliedQuarterlyCreationCancelled,
    WeeklyTaskAppliedQuarterlyDeletionCancelled,
    WeeklyTaskAppliedQuarterlyDeletionRequested,
    WeeklyTaskAppliedQuarterlyDeletionSaved,
    WeeklyTaskAppliedQuarterlysLoaded,
    WeeklyTaskAppliedQuarterlysRequestCancelled,
    WeeklyTaskAppliedQuarterlysRequested
} from './weekly-applied-quarterly.actions';

import { WeeklyTaskService } from '../../service/weekly-task.service';

@Injectable()
export class WeeklyTaskAppliedQuarterlysEffects {

    deleteWeeklyTaskAppliedQuarterly$ = createEffect(() => {
        return this.actions$
          .pipe(
            ofType<WeeklyTaskAppliedQuarterlyDeletionRequested>(
              WeeklyTaskAppliedQuarterlyActionTypes.WeeklyTaskAppliedQuarterlyDeletionRequested
            ),
            mergeMap(action => this.weeklyTaskService
              .deleteWeeklyTaskSchedulerAppliedQuarterly(action.payload.id)
              .pipe(
                map(deletionResponse => new WeeklyTaskAppliedQuarterlyDeletionSaved(
                  deletionResponse
                )),
                catchError(err => {
                  this.store.dispatch(
                    new WeeklyTaskAppliedQuarterlyDeletionCancelled({ err })
                  );
                  return of();
                })
              )
            )
          )
      });

    fetchWeeklyTasksAppliedQuarterlys$ = createEffect(() => {
        return this.actions$
          .pipe(
            ofType<WeeklyTaskAppliedQuarterlysRequested>(
                WeeklyTaskAppliedQuarterlyActionTypes.WeeklyTaskAppliedQuarterlysRequested
            ),
            mergeMap(action => this.weeklyTaskService
                .fetchWeeklyTaskAppliedQuarterlysByQuarter(
                    action.payload.quarter, action.payload.year
                )
              .pipe(
                map(weeklyTasks => new WeeklyTaskAppliedQuarterlysLoaded(
                    { weeklyTasks }
                )),
                catchError(err => {
                  this.store.dispatch(
                    new WeeklyTaskAppliedQuarterlysRequestCancelled({ err })
                  );
                  return of();
                })
              )
            )
          )
      });

    submitWeeklyTaskAppliedQuarterly$ = createEffect(() => {
        return this.actions$
          .pipe(
            ofType<WeeklyTaskAppliedQuarterlyCreateSubmitted>(
                WeeklyTaskAppliedQuarterlyActionTypes.WeeklyTaskAppliedQuarterlyCreateSubmitted
            ),
            mergeMap(action => this.weeklyTaskService
              .applyWeeklySchedulerToQuarterAndYear(
                action.payload.weeklyTaskAppliedQuarterly,
              ).pipe(catchError(err => {
                this.store.dispatch(
                  new WeeklyTaskAppliedQuarterlyCreationCancelled({ err })
                );
                return of();
              }),
            )),
            map(
              weeklyTaskAppliedQuarterly => new WeeklyTaskAppliedQuarterlyAdded(
                { weeklyTaskAppliedQuarterly }
              ),
            )
          )
      });

    constructor(
        private actions$: Actions,
        private weeklyTaskService: WeeklyTaskService,
        private store: Store<AppState>
      ) {}

}
