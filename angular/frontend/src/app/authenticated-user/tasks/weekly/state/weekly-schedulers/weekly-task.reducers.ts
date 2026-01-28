import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import { WeeklyTaskModel } from 'src/app/models/weekly-task.model';

import { getDayOfWeekInteger } from 'src/app/shared-utils/date-time.util';

import { 
    WeeklyTaskActions, WeeklyTaskSchedulersActionTypes 
} from './weekly-task.actions';

function compareWeeklyTasksByDayOfWeekAndName(
    a: WeeklyTaskModel, 
    b: WeeklyTaskModel
  ) {
    // First compare by day of week
    const dayA = getDayOfWeekInteger(a.day_of_week);
    const dayB = getDayOfWeekInteger(b.day_of_week);
    
    // If days are different, return the comparison result
    if (dayA !== dayB) {
      return dayA - dayB;
    }
    
    // If days are the same, compare by name
    const taskA = a.weekly_task_name;
    const taskB = b.weekly_task_name;
    
    if (taskA > taskB) {
      return 1;
    } else if (taskA < taskB) {
      return -1;
    }
    
    // Return 0 if both day and name are the same
    return 0;
  }

export interface WeeklyTasksState extends EntityState<WeeklyTaskModel> {
    errorMessage: string | undefined,
    weeklyTasksLoaded: boolean,
    successMessage: string | undefined,
};

export const adapter: EntityAdapter<WeeklyTaskModel> = 
    createEntityAdapter<WeeklyTaskModel>(
        { sortComparer: compareWeeklyTasksByDayOfWeekAndName }
    );

export const initialWeeklyTasksState: WeeklyTasksState = adapter.getInitialState({
    errorMessage: undefined,
    weeklyTasksLoaded: false,
    successMessage: undefined
});
export function weeklyTasksReducer(
    state = initialWeeklyTasksState,
    action: WeeklyTaskActions): WeeklyTasksState {
        switch(action.type) {

            case WeeklyTaskSchedulersActionTypes.WeeklyTaskSchedulerAdded:
                return adapter.addOne(action.payload.weeklyTaskScheduler, {...state,
                    errorMessage: undefined,
                    successMessage: 'Weekly Task Scheduler successfully submitted!'
                });
    
            case WeeklyTaskSchedulersActionTypes.WeeklyTaskSchedulerCreationCancelled:
                console.log(action.payload);
                let creationErrorMessage: string = "Error submitting weekly task scheduler!";
                if (action.payload.err.error.message) {
                    creationErrorMessage = action.payload.err.error.message;
                }
                return {
                    ...state,  successMessage: undefined,
                    errorMessage: creationErrorMessage
                }
        
            case WeeklyTaskSchedulersActionTypes.WeeklyTaskSchedulersCleared:
                return initialWeeklyTasksState;

            case WeeklyTaskSchedulersActionTypes.WeeklyTaskSchedulerDeletionCancelled:
                let errMsg: string = "Error! Monthly Task Deletion Failed!";
                if (action.payload.err.error.Error) {
                    errMsg = action.payload.err.error.Error;
                }
                return {
                    ...state,  successMessage: undefined,
                    errorMessage: errMsg
                 }
        
            case WeeklyTaskSchedulersActionTypes.WeeklyTaskSchedulerDeletionSaved:
                return adapter.removeOne(action.payload.id, 
                    { 
                        ...state,
                        errorMessage: undefined,
                        successMessage: action.payload.message
                    }
                );
              
            case WeeklyTaskSchedulersActionTypes.WeeklyTaskSchedulersRequestCancelled:
                let weeklyTasksErrorMessage: string = "Error fetching weekly tasks!";
                if (action.payload.err.error.message) {
                    weeklyTasksErrorMessage = action.payload.err.error.message;
                }
                return {
                    ...state,  successMessage: undefined,
                    errorMessage: weeklyTasksErrorMessage
                }
    
            case WeeklyTaskSchedulersActionTypes.WeeklyTaskSchedulersLoaded:
                return adapter.upsertMany(action.payload.weeklyTasks, {...state,
                    errorMessage: undefined,
                    weeklyTasksLoaded: true
                });
        
            case WeeklyTaskSchedulersActionTypes.WeeklyTasksMessagesCleared:
                return {
                    ...state,  successMessage: undefined,
                    errorMessage: undefined
                }

            default: {
                return state
            }
        }
    }

export const {
    selectAll,
    selectEntities,
    selectIds,
  } = adapter.getSelectors();
