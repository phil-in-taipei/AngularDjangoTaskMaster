import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { MonthlyTaskAppliedQuarterlyModel } from 'src/app/models/monthly-task.model';

import { 
    MonthlyTaskAppliedQuarterlyActionTypes, 
    MonthlyTaskAppliedQuarterlyActions 
} from './monthly-applied-quarterly.actions';

export interface MonthlyTaskAppliedQuarterlysState 
    extends EntityState<MonthlyTaskAppliedQuarterlyModel> {

        errorMessage: string | undefined,
        
        monthlyTaskAppliedQuarterlysLoaded: boolean,
        
        successMessage: string | undefined,
    
    };
    
export const adapter: EntityAdapter<MonthlyTaskAppliedQuarterlyModel> =
    
createEntityAdapter<MonthlyTaskAppliedQuarterlyModel>();
    
    export const initialMonthlyTaskAppliedQuarterlysState: 
        MonthlyTaskAppliedQuarterlysState = adapter.getInitialState({
    
        errorMessage: undefined,
        
        monthlyTaskAppliedQuarterlysLoaded: false,
        
        successMessage: undefined
    
    });

export function monthlyTaskAppliedQuarterlysReducer(
    state = initialMonthlyTaskAppliedQuarterlysState,
    action: MonthlyTaskAppliedQuarterlyActions
    ): MonthlyTaskAppliedQuarterlysState {
    switch (action.type) {
        case MonthlyTaskAppliedQuarterlyActionTypes.MonthlyTaskAppliedQuarterlyAdded:
            return adapter.addOne(action.payload.monthlyTaskAppliedQuarterly, {
              ...state,
              errorMessage: undefined,
              successMessage: 'Monthly Task Applied Quarterly successfully submitted!'
            });
       
        case MonthlyTaskAppliedQuarterlyActionTypes.MonthlyTaskAppliedQuarterlyCreationCancelled:
            console.log(action.payload);
            let creationErrorMessage: string = "Error submitting monthly task applied quarterly!";
            if (action.payload.err.error.message) {
              creationErrorMessage = action.payload.err.error.message;
            }
            return {
              ...state,
              successMessage: undefined,
              errorMessage: creationErrorMessage
            }
       
        case MonthlyTaskAppliedQuarterlyActionTypes.MonthlyTaskAppliedQuarterlysCleared:
            return initialMonthlyTaskAppliedQuarterlysState;
       
        case MonthlyTaskAppliedQuarterlyActionTypes.MonthlyTaskAppliedQuarterlysRequestCancelled:
            let monthlyTasksErrorMessage: string = "Error fetching monthly tasks applied quarterly!";
            if (action.payload.err.error.message) {
              monthlyTasksErrorMessage = action.payload.err.error.message;
            }
            return {
              ...state,
              successMessage: undefined,
              errorMessage: monthlyTasksErrorMessage
            }
       
        case MonthlyTaskAppliedQuarterlyActionTypes.MonthlyTaskAppliedQuarterlyDeletionCancelled:
            let errMsg: string = "Error! Monthly Task Applied Quarterly Deletion Failed!";
            if (action.payload.err.error.Error) {
              errMsg = action.payload.err.error.Error;
            }
            return {
              ...state,
              successMessage: undefined,
              errorMessage: errMsg
            }
       
        case MonthlyTaskAppliedQuarterlyActionTypes.MonthlyTaskAppliedQuarterlyDeletionSaved:
            return adapter.removeOne(
              action.payload.id,
              {
                ...state,
                errorMessage: undefined,
                successMessage: action.payload.message
              }
            );
       
        case MonthlyTaskAppliedQuarterlyActionTypes.MonthlyTaskAppliedQuarterlysLoaded:
            return adapter.upsertMany(
              action.payload.monthlyTasks,
              {
                ...state,
                errorMessage: undefined,
                monthlyTaskAppliedQuarterlysLoaded: true
              }
            );
       
        case MonthlyTaskAppliedQuarterlyActionTypes.MonthlyTasksAppliedQuarterlyMessagesCleared:
            return {
              ...state,
              successMessage: undefined,
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
