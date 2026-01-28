import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { WeeklyTaskAppliedQuarterlyModel } from 'src/app/models/weekly-task.model';

import {
    WeeklyTaskAppliedQuarterlyActionTypes,
    WeeklyTaskAppliedQuarterlyActions
} from './weekly-applied-quarterly.actions';

export interface WeeklyTaskAppliedQuarterlysState
    extends EntityState<WeeklyTaskAppliedQuarterlyModel> {

        errorMessage: string | undefined,

        weeklyTaskAppliedQuarterlysLoaded: boolean,

        successMessage: string | undefined,

    };

export const adapter: EntityAdapter<WeeklyTaskAppliedQuarterlyModel> =

createEntityAdapter<WeeklyTaskAppliedQuarterlyModel>();

    export const initialWeeklyTaskAppliedQuarterlysState:
        WeeklyTaskAppliedQuarterlysState = adapter.getInitialState({

        errorMessage: undefined,

        weeklyTaskAppliedQuarterlysLoaded: false,

        successMessage: undefined

    });

export function weeklyTaskAppliedQuarterlysReducer(
    state = initialWeeklyTaskAppliedQuarterlysState,
    action: WeeklyTaskAppliedQuarterlyActions
    ): WeeklyTaskAppliedQuarterlysState {
    switch (action.type) {
        case WeeklyTaskAppliedQuarterlyActionTypes.WeeklyTaskAppliedQuarterlyAdded:
            return adapter.addOne(action.payload.weeklyTaskAppliedQuarterly, {
              ...state,
              errorMessage: undefined,
              successMessage: 'Weekly Task Applied Quarterly successfully submitted!'
            });

        case WeeklyTaskAppliedQuarterlyActionTypes.WeeklyTaskAppliedQuarterlyCreationCancelled:
            console.log(action.payload);
            let creationErrorMessage: string = "Error submitting weekly task applied quarterly!";
            if (action.payload.err.error.message) {
              creationErrorMessage = action.payload.err.error.message;
            }
            return {
              ...state,
              successMessage: undefined,
              errorMessage: creationErrorMessage
            }

        case WeeklyTaskAppliedQuarterlyActionTypes.WeeklyTaskAppliedQuarterlysCleared:
            return initialWeeklyTaskAppliedQuarterlysState;

        case WeeklyTaskAppliedQuarterlyActionTypes.WeeklyTaskAppliedQuarterlysRequestCancelled:
            let weeklyTasksErrorMessage: string = "Error fetching weekly tasks applied quarterly!";
            if (action.payload.err.error.message) {
              weeklyTasksErrorMessage = action.payload.err.error.message;
            }
            return {
              ...state,
              successMessage: undefined,
              errorMessage: weeklyTasksErrorMessage
            }

        case WeeklyTaskAppliedQuarterlyActionTypes.WeeklyTaskAppliedQuarterlyDeletionCancelled:
            let errMsg: string = "Error! Weekly Task Applied Quarterly Deletion Failed!";
            if (action.payload.err.error.Error) {
              errMsg = action.payload.err.error.Error;
            }
            return {
              ...state,
              successMessage: undefined,
              errorMessage: errMsg
            }

        case WeeklyTaskAppliedQuarterlyActionTypes.WeeklyTaskAppliedQuarterlyDeletionSaved:
            return adapter.removeOne(
              action.payload.id,
              {
                ...state,
                errorMessage: undefined,
                successMessage: action.payload.message
              }
            );

        case WeeklyTaskAppliedQuarterlyActionTypes.WeeklyTaskAppliedQuarterlysLoaded:
            return adapter.upsertMany(
              action.payload.weeklyTasks,
              {
                ...state,
                errorMessage: undefined,
                weeklyTaskAppliedQuarterlysLoaded: true
              }
            );

        case WeeklyTaskAppliedQuarterlyActionTypes.WeeklyTasksAppliedQuarterlyMessagesCleared:
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
