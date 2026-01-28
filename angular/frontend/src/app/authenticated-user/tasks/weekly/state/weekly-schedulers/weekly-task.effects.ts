import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '../../../../../reducers';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, filter, map,
    mergeMap, withLatestFrom 
} from "rxjs/operators";

import { selectWeeklyTasksLoaded } from './weekly-task.selectors';
import {
    WeeklyTaskSchedulersActionTypes,
    WeeklyTaskSchedulerAdded,
    WeeklyTaskSchedulerCreateSubmitted,
    WeeklyTaskSchedulerCreationCancelled,
    WeeklyTaskSchedulerDeletionCancelled,
    WeeklyTaskSchedulerDeletionRequested,
    WeeklyTaskSchedulerDeletionSaved,
    WeeklyTaskSchedulersLoaded,
    WeeklyTaskSchedulersRequestCancelled, 
    WeeklyTaskSchedulersRequested 
} from './weekly-task.actions';
import { WeeklyTaskService } from '../../service/weekly-task.service';

@Injectable()
export class WeeklyTasksEffects {

  
    deleteWeeklyTaskScheduler$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType<WeeklyTaskSchedulerDeletionRequested>(
                  WeeklyTaskSchedulersActionTypes.WeeklyTaskSchedulerDeletionRequested),
                    mergeMap(action => this.weeklyTaskService
                        .deleteWeeklyTaskScheduler(action.payload.id)
                            .pipe(
                                map(deletionResponse => new WeeklyTaskSchedulerDeletionSaved(
                                    deletionResponse)
                                ),
                                catchError(err => {
                                    this.store.dispatch(
                                        new WeeklyTaskSchedulerDeletionCancelled({ err })
                                    );
                                    return of();
                                })
                            )
                    )
            )
        });
  
  
   
    fetchWeeklyTasksSchedulers$ = createEffect(() => {
        return this.actions$
          .pipe(
            ofType<WeeklyTaskSchedulersRequested>(
                WeeklyTaskSchedulersActionTypes.WeeklyTaskSchedulersRequested
            ),
            withLatestFrom(this.store.pipe(select(selectWeeklyTasksLoaded))),
            filter(([action, weeklyTasksLoaded]) => !weeklyTasksLoaded),
            mergeMap(action => this.weeklyTaskService.fetchWeeklyTaskSchedulers()
              .pipe(
                map(weeklyTasks => new WeeklyTaskSchedulersLoaded({ weeklyTasks })),
                catchError(err => {
                  this.store.dispatch(
                      new WeeklyTaskSchedulersRequestCancelled({ err })
                  );
                  return of();
                })
              )
            )
          )
    });



    submitWeeklyTaskScheduler$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType<WeeklyTaskSchedulerCreateSubmitted>(
                    WeeklyTaskSchedulersActionTypes.WeeklyTaskSchedulerCreateSubmitted),
                    mergeMap(action => this.weeklyTaskService
                        .submitWeeklyTaskScheduler(
                            action.payload.weeklyTask,
                            ).pipe(catchError(err => {
                                this.store.dispatch(
                                    new WeeklyTaskSchedulerCreationCancelled({ err })
                                );
                                return of();
                            }),
                        )
                  ),
                  map(
                    weeklyTaskScheduler => new WeeklyTaskSchedulerAdded(
                            { weeklyTaskScheduler }
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