import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '../../../../../reducers';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import {
    IntervalTaskGroupAppliedQuarterlyActionTypes,
    IntervalTaskGroupAppliedQuarterlyAdded,
    IntervalTaskGroupAppliedQuarterlyCreateSubmitted,
    IntervalTaskGroupAppliedQuarterlyCreationCancelled,
    IntervalTaskGroupAppliedQuarterlyDeletionCancelled,
    IntervalTaskGroupAppliedQuarterlyDeletionRequested,
    IntervalTaskGroupAppliedQuarterlyDeletionSaved,
    IntervalTaskGroupAppliedQuarterlysLoaded,
    IntervalTaskGroupAppliedQuarterlysRequestCancelled,
    IntervalTaskGroupAppliedQuarterlysRequested
} from './interval-task-group-applied-quarterly.actions';

import { IntervalTaskGroupService } from '../../service/interval-task-group.service';

@Injectable()
export class IntervalTaskGroupAppliedQuarterlysEffects {

    deleteIntervalTaskGroupAppliedQuarterly$ = createEffect(() => {
        return this.actions$
          .pipe(
            ofType<IntervalTaskGroupAppliedQuarterlyDeletionRequested>(
              IntervalTaskGroupAppliedQuarterlyActionTypes
                .IntervalTaskGroupAppliedQuarterlyDeletionRequested
            ),
            mergeMap(action => this.intervalTaskGroupService
              .deleteIntervalTaskGroupAppliedQuarterly(action.payload.id)
              .pipe(
                map(deletionResponse => new IntervalTaskGroupAppliedQuarterlyDeletionSaved(
                  deletionResponse
                )),
                catchError(err => {
                  this.store.dispatch(
                    new IntervalTaskGroupAppliedQuarterlyDeletionCancelled({ err })
                  );
                  return of();
                })
              )
            )
          )
      });

    fetchIntervalTasksAppliedQuarterlys$ = createEffect(() => {
        return this.actions$
          .pipe(
            ofType<IntervalTaskGroupAppliedQuarterlysRequested>(
                IntervalTaskGroupAppliedQuarterlyActionTypes
                    .IntervalTaskGroupAppliedQuarterlysRequested
            ),
            mergeMap(action => this.intervalTaskGroupService
                .fetchIntervalTaskGroupAppliedQuarterlysByQuarter(
                    action.payload.quarter, action.payload.year
                )
              .pipe(
                map(intervalTasks => new IntervalTaskGroupAppliedQuarterlysLoaded(
                    { intervalTasks }
                )),
                catchError(err => {
                  this.store.dispatch(
                    new IntervalTaskGroupAppliedQuarterlysRequestCancelled({ err })
                  );
                  return of();
                })
              )
            )
          )
      });

    submitIntervalTaskGroupAppliedQuarterly$ = createEffect(() => {
        return this.actions$
          .pipe(
            ofType<IntervalTaskGroupAppliedQuarterlyCreateSubmitted>(
                IntervalTaskGroupAppliedQuarterlyActionTypes
                    .IntervalTaskGroupAppliedQuarterlyCreateSubmitted
            ),
            mergeMap(action => this.intervalTaskGroupService
              .applyIntervalTaskGroupToQuarterAndYear(
                action.payload.intervalTaskGroupAppliedQuarterly,
              ).pipe(catchError(err => {
                this.store.dispatch(
                  new IntervalTaskGroupAppliedQuarterlyCreationCancelled({ err })
                );
                return of();
              }),
            )),
            map(
              intervalTaskGroupAppliedQuarterly => new IntervalTaskGroupAppliedQuarterlyAdded(
                { intervalTaskGroupAppliedQuarterly }
              ),
            )
          )
      });
   
      constructor(
        private actions$: Actions,
        private intervalTaskGroupService: IntervalTaskGroupService,
        private store: Store<AppState>
      ) {}

}
