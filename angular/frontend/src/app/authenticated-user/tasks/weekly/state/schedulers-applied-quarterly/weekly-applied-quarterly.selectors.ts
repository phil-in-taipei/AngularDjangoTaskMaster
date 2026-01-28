import { createFeatureSelector, createSelector } from '@ngrx/store';

import { WeeklyTaskAppliedQuarterlysState } from './weekly-applied-quarterly.reducers';
import * as fromWeeklyTasksAppliedQuarterly from './weekly-applied-quarterly.reducers';

export const selectWeeklyTasksAppliedQuarterlyState =
  createFeatureSelector<WeeklyTaskAppliedQuarterlysState>("weeklyTasksAppliedQuarterly");

  export const selectAllWeeklyTaskAppliedQuarterlys = createSelector(
    selectWeeklyTasksAppliedQuarterlyState,
    fromWeeklyTasksAppliedQuarterly.selectAll
  );

export const selectWeeklyTaskAppliedQuarterlyById = (id: number) => createSelector(
    selectWeeklyTasksAppliedQuarterlyState,
    state => state.entities[id]
  );

export const selectWeeklyTaskAppliedQuarterlysLoaded = createSelector(
    selectWeeklyTasksAppliedQuarterlyState,
    state => state.weeklyTaskAppliedQuarterlysLoaded
  );

export const weeklyTaskAppliedQuarterlysErrorMsg = createSelector(
    selectWeeklyTasksAppliedQuarterlyState,
    state => state.errorMessage
  );

export const weeklyTaskAppliedQuarerlysSuccessMsg = createSelector(
    selectWeeklyTasksAppliedQuarterlyState,
    state => state.successMessage
  );
