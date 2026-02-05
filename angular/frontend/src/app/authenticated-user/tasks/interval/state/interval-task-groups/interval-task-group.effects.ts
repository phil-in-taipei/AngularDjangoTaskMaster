import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '../../../../../reducers';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { selectIntervalTaskGroupsLoaded } from './interval-task-group.selectors';
import { 
    IntervalTaskGroupsActionTypes,
    IntervalTaskGroupAdded,
    IntervalTaskGroupCreateSubmitted,
    IntervalTaskGroupCreationCancelled,
    IntervalTaskGroupDeletionCancelled,
    IntervalTaskGroupDeletionRequested,
    IntervalTaskGroupDeletionSaved,
    IntervalTaskGroupsLoaded,
    IntervalTaskGroupsRequestCancelled,
    IntervalTaskGroupsRequested,
    IntervalTaskSchedulerAdded,
    IntervalTaskSchedulerCreationCancelled,
    IntervalTaskSchedulerCreateSubmitted, 
    IntervalTaskSchedulerDeletionCancelled,
    IntervalTaskSchedulerDeletionRequested,
    IntervalTaskSchedulerDeletionSaved,
} from './interval-task-group.actions';
import { IntervalTaskGroupService } from '../../service/interval-task-group.service';

@Injectable()
export class IntervalTaskGroupEffects {

    deleteIntervalTask$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType<IntervalTaskSchedulerDeletionRequested>(
                    IntervalTaskGroupsActionTypes.IntervalTaskSchedulerDeletionRequested
                ),
                    mergeMap(action => this.intervalTaskGroupService
                        .deleteIntervalTaskFromGroup(
                            action.payload.intervalTaskId, 
                            action.payload.taskGroupId
                        )
                        .pipe(
                            map(intervalTaskGroup => 
                                new IntervalTaskSchedulerDeletionSaved({ 
                                    intervalTaskGroup:
                                    {   id: intervalTaskGroup.id, 
                                        changes: intervalTaskGroup 
                                    }
                            })
                        ),
                        catchError(err => {
                            this.store.dispatch(
                                new IntervalTaskSchedulerDeletionCancelled(
                                    { err }
                                )
                            );
                            return of();
                        })
                    )
                )
            )
    });
  

    deleteIntervalTaskGroup$ = createEffect(() => {
        return this.actions$
            .pipe(ofType<IntervalTaskGroupDeletionRequested>(
                IntervalTaskGroupsActionTypes.IntervalTaskGroupDeletionRequested
            ),
                mergeMap(action => this.intervalTaskGroupService
                    .deleteIntervalTaskGroup(action.payload.id)
                    .pipe(
                        map(deletionResponse => new IntervalTaskGroupDeletionSaved(
                        deletionResponse
                    )),
                catchError(err => {
                    this.store.dispatch(
                        new IntervalTaskGroupDeletionCancelled({ err }));
                        return of();
                    })
                )
            )
        )
    });
    
    fetchIntervalTasksGroups$ = createEffect(() => {
        return this.actions$
            .pipe(
            ofType<IntervalTaskGroupsRequested>(
            IntervalTaskGroupsActionTypes.IntervalTaskGroupsRequested),
            withLatestFrom(this.store.pipe(select(selectIntervalTaskGroupsLoaded))),
            filter(([action, intervalTaskGroupsLoaded]) => !intervalTaskGroupsLoaded),
                mergeMap(action => this.intervalTaskGroupService.fetchIntervalTaskGroups()
                    .pipe(
                        map(intervalTaskGroups => new IntervalTaskGroupsLoaded(
                            { intervalTaskGroups }
                        )),
                        catchError(err => {
                            this.store.dispatch(
                            new IntervalTaskGroupsRequestCancelled({ err })
                        );
                    return of();
                    }))
                )
            )
        }
    );

    submitIntervalTask$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType<IntervalTaskSchedulerCreateSubmitted>(
                    IntervalTaskGroupsActionTypes.IntervalTaskSchedulerCreateSubmitted
                ),
                    mergeMap(action => this.intervalTaskGroupService
                        .submitIntervalTaskScheduler(
                            action.payload.intervalTask
                        )
                        .pipe(
                            map(intervalTaskGroup => 
                                new IntervalTaskSchedulerAdded({ 
                                    intervalTaskGroup:
                                    {   id: intervalTaskGroup.id, 
                                        changes: intervalTaskGroup 
                                    }
                            })
                        ),
                        catchError(err => {
                            this.store.dispatch(
                                new IntervalTaskSchedulerCreationCancelled(
                                    { err }
                                )
                            );
                            return of();
                        })
                    )
                )
            )
    });

    submitIntervalTaskGroup$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType<IntervalTaskGroupCreateSubmitted>(
                    IntervalTaskGroupsActionTypes.IntervalTaskGroupCreateSubmitted
                ),
                    mergeMap(action => this.intervalTaskGroupService
                        .submitIntervalTaskGroup(
                            action.payload.intervalTaskGroup,
                        )
                        .pipe(catchError(err => {
                            this.store.dispatch(
                                new IntervalTaskGroupCreationCancelled({ err })
                                );
                                    return of();
                                }),
                            )
                    ),
                    map(
                        intervalTaskGroup => new IntervalTaskGroupAdded(
                            { intervalTaskGroup }
                        ),
                )
        )}
    );

    constructor(
        private actions$: Actions,
        private intervalTaskGroupService: IntervalTaskGroupService,
        private store: Store<AppState>
    ) {}
}