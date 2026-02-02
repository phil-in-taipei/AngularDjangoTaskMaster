import { createFeatureSelector, createSelector } from '@ngrx/store';

import { MonthlyTasksState } from './monthly-task.reducers';
import * as fromMonthlyTasks from './monthly-task.reducers';

export const selectMonthlyTasksState =
  createFeatureSelector<MonthlyTasksState>("monthlyTasks");

export const selectAllMonthlyTaskSchedulers = createSelector(
  selectMonthlyTasksState,
  fromMonthlyTasks.selectAll
);

export const selectMonthlyTaskSchedulerById = (id: number) => createSelector(
  selectMonthlyTasksState,
  monthlyTasksState => monthlyTasksState.entities[id]
);

export const selectMonthlyTasksLoaded = createSelector(
  selectMonthlyTasksState,
  monthlyTasksState => monthlyTasksState.monthlyTasksLoaded
);

export const monthlyTaskErrorMsg = createSelector(
  selectMonthlyTasksState,
  monthlyTasksState => monthlyTasksState.errorMessage
);

export const monthlyTaskSuccessMsg = createSelector(
  selectMonthlyTasksState,
  monthlyTasksState => monthlyTasksState.successMessage
);
