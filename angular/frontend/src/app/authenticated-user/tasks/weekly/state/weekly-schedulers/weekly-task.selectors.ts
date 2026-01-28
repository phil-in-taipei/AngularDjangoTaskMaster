import {createFeatureSelector, createSelector} from '@ngrx/store';

import { WeeklyTasksState } from './weekly-task.reducers';
import * as fromWeeklyTasks from './weekly-task.reducers';

export const selectWeeklyTasksState = 
            createFeatureSelector<WeeklyTasksState>("weeklyTasks");

export const selectAllWeeklyTaskSchedulers = createSelector(
        selectWeeklyTasksState,
        fromWeeklyTasks.selectAll
    );

export const selectWeeklyTaskSchedulerById = (id:number) => createSelector(
        selectWeeklyTasksState,
        weeklyTasksState => weeklyTasksState.entities[id]
    );

export const selectWeeklyTasksLoaded = createSelector(
    selectWeeklyTasksState,
    weeklyTasksState => weeklyTasksState.weeklyTasksLoaded
    );
    
export const weeklyTaskErrorMsg = createSelector(
    selectWeeklyTasksState,
    weeklyTasksState => weeklyTasksState.errorMessage
    );
      
export const weeklyTaskSuccessMsg = createSelector(
        selectWeeklyTasksState,
        weeklyTasksState => weeklyTasksState.successMessage
    );
