import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IntervalTaskGroupModel } from 'src/app/models/interval-task-group.model';

import { 
    IntervalTaskGroupActions, IntervalTaskGroupsActionTypes 
} from './interval-task-group.actions';

function compareIntervalTaskGroupsByName(
    a: IntervalTaskGroupModel, b: IntervalTaskGroupModel
  ) {
    const taskA = a.taskGroupName;
    const taskB = b.taskGroupName;
  
    let comparison = 0;
    if (taskA > taskB) {
      comparison = 1;
    } else if (taskA < taskB) {
      comparison = -1;
    }
    return comparison;
  };


export interface IntervalTaskGroupsState extends EntityState<IntervalTaskGroupModel> {
    errorMessage: string | undefined,
    intervalTaskGroupsLoaded: boolean,
    successMessage: string | undefined,
  };
  
export const adapter: EntityAdapter<IntervalTaskGroupModel> =
    createEntityAdapter<IntervalTaskGroupModel>(
      { sortComparer: compareIntervalTaskGroupsByName }
    );

export const initialIntervalTaskGroupsState: IntervalTaskGroupsState = adapter.getInitialState({
        errorMessage: undefined,
        intervalTaskGroupsLoaded: false,
        successMessage: undefined
    });

export function intervalTaskGroupsReducer(
        state = initialIntervalTaskGroupsState,
        action: IntervalTaskGroupActions
    ): IntervalTaskGroupsState {
        switch (action.type) {

            case IntervalTaskGroupsActionTypes.IntervalTaskGroupAdded:
                return adapter.addOne(action.payload.intervalTaskGroup, { ...state,
                  errorMessage: undefined,
                  successMessage: 'Interval task group successfully submitted!'
                });


            case IntervalTaskGroupsActionTypes.IntervalTaskSchedulerAdded:
                return adapter.updateOne(action.payload.intervalTaskGroup, 
                     {
                        ...state,
                        errorMessage: undefined,
                        successMessage: 'You have successfully added a task to the group!'
                    }
                );
             
            case IntervalTaskGroupsActionTypes.IntervalTaskGroupCreationCancelled:
                console.log(action.payload);
                let taskGroupCreationErrorMessage: string = "Error submitting interval task group!";
                if (action.payload.err.error.message) {
                    taskGroupCreationErrorMessage = action.payload.err.error.message;
                }
                return {
                  ...state, successMessage: undefined,
                  errorMessage: taskGroupCreationErrorMessage
                }
             
            case IntervalTaskGroupsActionTypes.IntervalTaskSchedulerCreationCancelled:
                console.log(action.payload);
                let taskSchedulerCreationErrorMessage: string = "Error submitting interval task scheduler!";
                if (action.payload.err.error.message) {
                    taskSchedulerCreationErrorMessage = action.payload.err.error.message;
                }
                return {
                    ...state, successMessage: undefined,
                    errorMessage: taskSchedulerCreationErrorMessage
                }
       
            case IntervalTaskGroupsActionTypes.IntervalTaskGroupsCleared:
                return initialIntervalTaskGroupsState;
          
            case IntervalTaskGroupsActionTypes.IntervalTaskGroupsRequestCancelled:
                let intervalTaskGroupsErrorMessage: string = "Error fetching interval task groups!";
                if (action.payload.err.error.message) {
                  intervalTaskGroupsErrorMessage = action.payload.err.error.message;
                }
                return {
                  ...state, successMessage: undefined,
                  errorMessage: intervalTaskGroupsErrorMessage
                }
          
            case IntervalTaskGroupsActionTypes.IntervalTaskGroupDeletionCancelled:
                let errMsg: string = "Error! Interval Task Group Deletion Failed!";
                if (action.payload.err.error.Error) {
                    errMsg = action.payload.err.error.Error;
                }
                return {
                    ...state,  successMessage: undefined,
                    errorMessage: errMsg
                }

            case IntervalTaskGroupsActionTypes.IntervalTaskSchedulerDeletionCancelled:
                let err: string = "Error! Interval Task Scheduler Deletion Failed!";
                if (action.payload.err.error.Error) {
                    err = action.payload.err.error.Error;
                }
                return {
                    ...state,  successMessage: undefined,
                    errorMessage: err
                }   
     
            case IntervalTaskGroupsActionTypes.IntervalTaskGroupDeletionSaved:
                return adapter.removeOne(action.payload.id, 
                    { 
                        ...state,
                        errorMessage: undefined,
                        successMessage: action.payload.message
                    }
                  );


            case IntervalTaskGroupsActionTypes.IntervalTaskSchedulerDeletionSaved:
                return adapter.updateOne(action.payload.intervalTaskGroup, 
                    {
                        ...state,
                        errorMessage: undefined,
                        successMessage: 'You have successfully removed a task from the group!'
                        }
                );
                        
            case IntervalTaskGroupsActionTypes.IntervalTaskGroupsLoaded:
                return adapter.upsertMany(action.payload.intervalTaskGroups, { ...state,
                  errorMessage: undefined,
                  intervalTaskGroupsLoaded: true
                });
          
            case IntervalTaskGroupsActionTypes.IntervalTasksMessagesCleared:
                return {
                  ...state, successMessage: undefined,
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