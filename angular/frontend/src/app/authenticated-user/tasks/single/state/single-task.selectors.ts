import {createFeatureSelector, createSelector} from '@ngrx/store';

import { SingleTasksState } from './single-task.reducers';
import * as fromSingleTasks from './single-task.reducers';

export const selectSingleTasksState = 
            createFeatureSelector<SingleTasksState>("singleTasks");

export const selectAllSingleTasks = createSelector(
    selectSingleTasksState,
    fromSingleTasks.selectAll
);

export const selectSingleTasksById = (id:number) => createSelector(
    selectSingleTasksState,
    singleTasksState => singleTasksState.entities[id]
  );
  
  export const selectSingleTasksByDate = (date: string) => createSelector(
    selectAllSingleTasks,
    singleTasksState => {
        return singleTasksState.filter(singleTask => singleTask.date == date);
    }
  );

export const selectFetchingTasksInProgress = createSelector(
    selectSingleTasksState,
    singleTasksState => singleTasksState.fetchingTasksInProgress
);
              
export const selectLandingPageTasksLoaded = createSelector(
    selectSingleTasksState,
    singleTasksState => singleTasksState.landingPageSingleTasksLoaded
);

export const selectMonthlyDateRange = createSelector(
    selectSingleTasksState,
    singleTasksState => singleTasksState.dateRange
  );
              
export const selectSingleTasksByMonthLoaded = createSelector(
    selectSingleTasksState,
    singleTasksState => singleTasksState.monthlySingleTasksLoaded
);

export const singleTaskErrorMsg = createSelector(
    selectSingleTasksState,
    singleTasksState => singleTasksState.errorMessage
);
  
export const singleTaskSuccessMsg = createSelector(
    selectSingleTasksState,
    singleTasksState => singleTasksState.successMessage
);