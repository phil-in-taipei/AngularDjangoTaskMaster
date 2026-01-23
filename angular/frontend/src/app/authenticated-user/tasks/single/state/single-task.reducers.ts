import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import { SingleTaskModel } from 'src/app/models/single-task.model';

import { SingleTaskActions, SingleTaskActionTypes } from './single-task.actions';
import { 
    getFirstDateofMonthStr, 
    getLastDateOfMonthStr 
} from 'src/app/shared-utils/date-time.util';

function compareSingleTasksByDate(
    a:SingleTaskModel, b:SingleTaskModel) {
    const taskA = a.date;
    const taskB = b.date;
  
    let comparison = 0;
    if (taskA > taskB) {
      comparison = 1;
    } else if (taskA < taskB) {
      comparison = -1;
    }
    return comparison;
};

export interface SingleTasksState extends EntityState<SingleTaskModel> {
    dateRange: [string, string] | undefined;
    fetchingTasksInProgress: boolean;
    errorMessage: string | undefined,
    monthlySingleTasksLoaded: boolean,
    landingPageSingleTasksLoaded: boolean,
    successMessage: string | undefined,
};

export const adapter: EntityAdapter<SingleTaskModel> = 
    createEntityAdapter<SingleTaskModel>(
        { sortComparer: compareSingleTasksByDate }
    );

export const initialSingleTasksState: SingleTasksState = adapter.getInitialState({
    dateRange: undefined,
    errorMessage: undefined,
    fetchingTasksInProgress: false,
    monthlySingleTasksLoaded: false,
    landingPageSingleTasksLoaded: false,
    successMessage: undefined
});

export function singleTasksReducer(
    state = initialSingleTasksState,
    action: SingleTaskActions): SingleTasksState {

    switch(action.type) {

        case SingleTaskActionTypes.DailyTasksRequested:
            return {
                ...state, 
                fetchingTasksInProgress: true
            }


        case SingleTaskActionTypes.DailyTasksLoaded:
            return adapter.upsertMany(action.payload.singleTasks, {...state,
                errorMessage: undefined,
                landingPageSingleTasksLoaded: true,
                fetchingTasksInProgress: false
            });

        case SingleTaskActionTypes.DailyTasksRequestCancelled:
            let dailyTasksErrorMessage: string = "Error fetching daily tasks!";
            if (action.payload.err.error.message) {
                dailyTasksErrorMessage = action.payload.err.error.message;
            }
            return {
                ...state,  successMessage: undefined,
                errorMessage: dailyTasksErrorMessage
            }

        case SingleTaskActionTypes.LandingPageTasksLoaded:
            return adapter.upsertMany(action.payload.singleTasks, {...state,
                errorMessage: undefined,
                landingPageSingleTasksLoaded: true
            });

        case SingleTaskActionTypes.LandingPageTasksRequestCancelled:
            let landingPageErrorMessage: string = "Error fetching daily tasks!";
            if (action.payload.err.error.message) {
                landingPageErrorMessage = action.payload.err.error.message;
            }
            return {
                ...state,  successMessage: undefined,
                errorMessage: landingPageErrorMessage
            }

        case SingleTaskActionTypes.MonthlyTasksRequested:
            let month:number = +action.payload.month;
            let year:number = +action.payload.year;
            let firstDate = getFirstDateofMonthStr(month, year);
            let lastDate = getLastDateOfMonthStr(month, year);
            return {
                ...state,  dateRange: [firstDate, lastDate],
                fetchingTasksInProgress: true

            }

        case SingleTaskActionTypes.MonthlyTasksRequestCancelled:
            let monthlyPageErrorMessage: string = "Error fetching monthly tasks!";
            if (action.payload.err.error.message) {
                monthlyPageErrorMessage = action.payload.err.error.message;
            }
            return {
                ...state,  successMessage: undefined,
                errorMessage: monthlyPageErrorMessage,
                fetchingTasksInProgress: false
            }

        case SingleTaskActionTypes.MonthlyTasksLoaded:
            return adapter.upsertMany(action.payload.monthlyTasks, {...state,
                errorMessage: undefined,
                monthlySingleTasksLoaded: true,
                fetchingTasksInProgress: false
            });

        case SingleTaskActionTypes.SingleTaskConfirmationCancelled:
            let taskConfirmationErrorMessage: string = "Error confirming task completion!";
                if (action.payload.err.error.message) {
                    taskConfirmationErrorMessage = action.payload.err.error.message;
                }
                return {
                    ...state,  successMessage: undefined,
                    errorMessage: taskConfirmationErrorMessage
                }

    
        case SingleTaskActionTypes.SingleTaskConfirmationSaved:
            return adapter.updateOne(action.payload.singleTask, 
                {
                    ...state,
                    errorMessage:undefined,
                    successMessage: undefined
                }
            );
          
        case SingleTaskActionTypes.SingleTaskCreatedWithDailyBatchAdded:
            return adapter.upsertMany(action.payload.dailyTasks, {...state,
                errorMessage: undefined,
                successMessage: 'Task successfully submitted!'
            });

        case SingleTaskActionTypes.SingleTasksCleared:
            return initialSingleTasksState;

        case SingleTaskActionTypes.SingleTaskCreationCancelled:
            console.log(action.payload);
            let userErrorMessage: string = "Error submitting task!";
            if (action.payload.err.error.message) {
                userErrorMessage = action.payload.err.error.message;
            }
            return {
                ...state,  successMessage: undefined,
                errorMessage: userErrorMessage
            }

        case SingleTaskActionTypes.SingleTaskDeletionCancelled:
            let deletionErrMsg: string = "Error! Task Deletion Failed!";
            if (action.payload.err.error.Error) {
                deletionErrMsg = action.payload.err.error.Error;
            }
            return {
                ...state,  successMessage: undefined,
                errorMessage: deletionErrMsg
            }
    
        case SingleTaskActionTypes.SingleTaskDeletionSaved:
            return adapter.removeOne(action.payload.id, 
                { 
                    ...state,
                    errorMessage: undefined,
                    successMessage: action.payload.message
                }
            );

        case SingleTaskActionTypes.SingleTaskEditCancelled:
            let editErrMessage: string = "Error! Task Rescheduling Failed!";
            if (action.payload.err.error.Error) {
                console.log(action.payload.err.error.Error)
                editErrMessage = action.payload.err.error.Error;
            }
            return {
                ...state,  successMessage: undefined,
                errorMessage: editErrMessage
            }
    
        case SingleTaskActionTypes.SingleTaskEditUpdated:
            return adapter.updateOne(action.payload.singleTask, 
                {
                    ...state,
                    errorMessage: undefined,
                    successMessage: 'You have successfully rescheduled the task!'
                }
            );
     
        case SingleTaskActionTypes.SingleTaskMessagesCleared:
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