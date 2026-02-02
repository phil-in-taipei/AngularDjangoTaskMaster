import { createFeatureSelector, createSelector } from '@ngrx/store';

import { MonthlyTaskAppliedQuarterlysState } from './monthly-applied-quarterly.reducers';
import * as fromMonthlyTasksAppliedQuarterly from './monthly-applied-quarterly.reducers';

export const selectMonthlyTasksAppliedQuarterlyState =
  createFeatureSelector<MonthlyTaskAppliedQuarterlysState>("monthlyTasksAppliedQuarterly");

  export const selectAllMonthlyTaskAppliedQuarterlys = createSelector(
    selectMonthlyTasksAppliedQuarterlyState,
    fromMonthlyTasksAppliedQuarterly.selectAll
  );
  
export const selectMonthlyTaskAppliedQuarterlyById = (id: number) => createSelector(
    selectMonthlyTasksAppliedQuarterlyState,
    state => state.entities[id]
  );

export const selectMonthlyTaskAppliedQuarterlysLoaded = createSelector(
    selectMonthlyTasksAppliedQuarterlyState,
    state => state.monthlyTaskAppliedQuarterlysLoaded
  );
  
export const monthlyTaskAppliedQuarterlysErrorMsg = createSelector(
    selectMonthlyTasksAppliedQuarterlyState,
    state => state.errorMessage
  );
  
export const monthlyTaskAppliedQuarerlysSuccessMsg = createSelector(
    selectMonthlyTasksAppliedQuarterlyState,
    state => state.successMessage
  );
