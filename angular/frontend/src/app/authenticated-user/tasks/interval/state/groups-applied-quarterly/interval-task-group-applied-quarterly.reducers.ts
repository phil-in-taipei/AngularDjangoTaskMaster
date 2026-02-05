import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { IntervalTaskGroupAppliedQuarterlyModel } from 'src/app/models/interval-task-group.model';

import {
    IntervalTaskGroupAppliedQuarterlyActionTypes,
    IntervalTaskGroupAppliedQuarterlyActions
} from './interval-task-group-applied-quarterly.actions';

export interface IntervalTaskGroupAppliedQuarterlysState
    extends EntityState<IntervalTaskGroupAppliedQuarterlyModel> {

        errorMessage: string | undefined,

        intervalTaskGroupAppliedQuarterlysLoaded: boolean,

        successMessage: string | undefined,

    };

export const adapter: EntityAdapter<IntervalTaskGroupAppliedQuarterlyModel> =

createEntityAdapter<IntervalTaskGroupAppliedQuarterlyModel>();

    export const initialIntervalTaskGroupAppliedQuarterlysState:
        IntervalTaskGroupAppliedQuarterlysState = adapter.getInitialState({

        errorMessage: undefined,

        intervalTaskGroupAppliedQuarterlysLoaded: false,

        successMessage: undefined

    });

export function intervalTaskGroupAppliedQuarterlysReducer(
    state = initialIntervalTaskGroupAppliedQuarterlysState,
    action: IntervalTaskGroupAppliedQuarterlyActions
    ): IntervalTaskGroupAppliedQuarterlysState {
    switch (action.type) {
        case IntervalTaskGroupAppliedQuarterlyActionTypes
                .IntervalTaskGroupAppliedQuarterlyAdded:
            return adapter.addOne(action.payload.intervalTaskGroupAppliedQuarterly, {
              ...state,
              errorMessage: undefined,
              successMessage: 'Interval Task Group Applied Quarterly successfully submitted!'
            });

        case IntervalTaskGroupAppliedQuarterlyActionTypes
                .IntervalTaskGroupAppliedQuarterlyCreationCancelled:
            let creationErrorMessage: string = "Error submitting interval task group applied quarterly!";
            if (action.payload.err.error.message) {
              creationErrorMessage = action.payload.err.error.message;
            }
            return {
              ...state,
              successMessage: undefined,
              errorMessage: creationErrorMessage
            }

        case IntervalTaskGroupAppliedQuarterlyActionTypes
                .IntervalTaskGroupAppliedQuarterlysCleared:
            return initialIntervalTaskGroupAppliedQuarterlysState;

        case IntervalTaskGroupAppliedQuarterlyActionTypes
                .IntervalTaskGroupAppliedQuarterlysRequestCancelled:
            let intervalTasksErrorMessage: string = "Error fetching interval tasks applied quarterly!";
            if (action.payload.err.error.message) {
              intervalTasksErrorMessage = action.payload.err.error.message;
            }
            return {
              ...state,
              successMessage: undefined,
              errorMessage: intervalTasksErrorMessage
            }

        case IntervalTaskGroupAppliedQuarterlyActionTypes
                .IntervalTaskGroupAppliedQuarterlyDeletionCancelled:
            let errMsg: string = "Error! Interval Task Group Applied Quarterly Deletion Failed!";
            if (action.payload.err.error.Error) {
              errMsg = action.payload.err.error.Error;
            }
            return {
              ...state,
              successMessage: undefined,
              errorMessage: errMsg
            }

        case IntervalTaskGroupAppliedQuarterlyActionTypes
                .IntervalTaskGroupAppliedQuarterlyDeletionSaved:
            return adapter.removeOne(
              action.payload.id,
              {
                ...state,
                errorMessage: undefined,
                successMessage: action.payload.message
              }
            );

        case IntervalTaskGroupAppliedQuarterlyActionTypes
                .IntervalTaskGroupAppliedQuarterlysLoaded:
            return adapter.upsertMany(
              action.payload.intervalTasks,
              {
                ...state,
                errorMessage: undefined,
                intervalTaskGroupAppliedQuarterlysLoaded: true
              }
            );

        case IntervalTaskGroupAppliedQuarterlyActionTypes
                .IntervalTasksAppliedQuarterlyMessagesCleared:
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
