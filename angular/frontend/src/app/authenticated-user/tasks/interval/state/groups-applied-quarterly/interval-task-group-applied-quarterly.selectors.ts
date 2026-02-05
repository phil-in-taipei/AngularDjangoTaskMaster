import { createFeatureSelector, createSelector } from '@ngrx/store';

import { 
    IntervalTaskGroupAppliedQuarterlysState 
} from './interval-task-group-applied-quarterly.reducers';
import * as fromIntervalTasksAppliedQuarterly from './interval-task-group-applied-quarterly.reducers';

export const selectIntervalTasksAppliedQuarterlyState =
  createFeatureSelector<IntervalTaskGroupAppliedQuarterlysState>(
    "intervalTasksAppliedQuarterly"
);

export const selectAllIntervalTaskGroupAppliedQuarterlys = createSelector(
    selectIntervalTasksAppliedQuarterlyState,
    fromIntervalTasksAppliedQuarterly.selectAll
  );

export const selectIntervalTaskGroupAppliedQuarterlyById = (id: number) => createSelector(
    selectIntervalTasksAppliedQuarterlyState,
    state => state.entities[id]
  );

export const selectIntervalTaskGroupAppliedQuarterlysLoaded = createSelector(
    selectIntervalTasksAppliedQuarterlyState,
    state => state.intervalTaskGroupAppliedQuarterlysLoaded
  );

export const intervalTaskGroupAppliedQuarterlysErrorMsg = createSelector(
    selectIntervalTasksAppliedQuarterlyState,
    state => state.errorMessage
  );

export const intervalTaskGroupAppliedQuarterlysSuccessMsg = createSelector(
    selectIntervalTasksAppliedQuarterlyState,
    state => state.successMessage
  );
