import {createFeatureSelector, createSelector} from '@ngrx/store';

import { IntervalTaskGroupsState } from './interval-task-group.reducers';
import * as fromIntervalTaskGroups from './interval-task-group.reducers';

export const selectIntervalTasksState =
  createFeatureSelector<IntervalTaskGroupsState>("intervalTasks");

export const selectAllIntervalTaskGroups = createSelector(
    selectIntervalTasksState,
    fromIntervalTaskGroups.selectAll
);

export const selectIntervalTaskGroupById = (id: number) => createSelector(
    selectIntervalTasksState,
    intervalTasksState => intervalTasksState.entities[id]
);

export const selectIntervalTaskGroupsLoaded = createSelector(
    selectIntervalTasksState,
    intervalTasksState => intervalTasksState.intervalTaskGroupsLoaded
);

export const intervalTaskGroupsErrorMsg = createSelector(
    selectIntervalTasksState,
    intervalTasksState => intervalTasksState.errorMessage
);

export const intervalTaskGroupsSuccessMsg = createSelector(
    selectIntervalTasksState,
    intervalTasksState => intervalTasksState.successMessage
);
