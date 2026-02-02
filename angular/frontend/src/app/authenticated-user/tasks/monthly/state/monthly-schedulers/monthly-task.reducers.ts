import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { MonthlyTaskModel } from 'src/app/models/monthly-task.model';

import { MonthlyTaskActions, MonthlyTaskSchedulersActionTypes } from './monthly-task.actions';

function compareMonthlyTasksByDayOfMonth(
  a: MonthlyTaskModel, b: MonthlyTaskModel
) {
  const taskA = a.day_of_month;
  const taskB = b.day_of_month;

  let comparison = 0;
  if (taskA > taskB) {
    comparison = 1;
  } else if (taskA < taskB) {
    comparison = -1;
  }
  return comparison;
};

export interface MonthlyTasksState extends EntityState<MonthlyTaskModel> {
  errorMessage: string | undefined,
  monthlyTasksLoaded: boolean,
  successMessage: string | undefined,
};

export const adapter: EntityAdapter<MonthlyTaskModel> =
  createEntityAdapter<MonthlyTaskModel>(
    { sortComparer: compareMonthlyTasksByDayOfMonth }
  );

export const initialMonthlyTasksState: MonthlyTasksState = adapter.getInitialState({
  errorMessage: undefined,
  monthlyTasksLoaded: false,
  successMessage: undefined
});

export function monthlyTasksReducer(
  state = initialMonthlyTasksState,
  action: MonthlyTaskActions
): MonthlyTasksState {
  switch (action.type) {

    case MonthlyTaskSchedulersActionTypes.MonthlyTaskSchedulerAdded:
      return adapter.addOne(action.payload.monthlyTaskScheduler, { ...state,
        errorMessage: undefined,
        successMessage: 'Monthly Task Scheduler successfully submitted!'
      });

    case MonthlyTaskSchedulersActionTypes.MonthlyTaskSchedulerCreationCancelled:
      console.log(action.payload);
      let creationErrorMessage: string = "Error submitting monthly task scheduler!";
      if (action.payload.err.error.message) {
        creationErrorMessage = action.payload.err.error.message;
      }
      return {
        ...state, successMessage: undefined,
        errorMessage: creationErrorMessage
      }

    case MonthlyTaskSchedulersActionTypes.MonthlyTaskSchedulersCleared:
      return initialMonthlyTasksState;

    case MonthlyTaskSchedulersActionTypes.MonthlyTaskSchedulersRequestCancelled:
      let monthlyTasksErrorMessage: string = "Error fetching monthly tasks!";
      if (action.payload.err.error.message) {
        monthlyTasksErrorMessage = action.payload.err.error.message;
      }
      return {
        ...state, successMessage: undefined,
        errorMessage: monthlyTasksErrorMessage
      }

    case MonthlyTaskSchedulersActionTypes.MonthlyTaskSchedulerDeletionCancelled:
      let errMsg: string = "Error! Monthly Task Deletion Failed!";
      if (action.payload.err.error.Error) {
          errMsg = action.payload.err.error.Error;
      }
      return {
          ...state,  successMessage: undefined,
          errorMessage: errMsg
      }

    case MonthlyTaskSchedulersActionTypes.MonthlyTaskSchedulerDeletionSaved:
      return adapter.removeOne(action.payload.id, 
          { 
              ...state,
              errorMessage: undefined,
              successMessage: action.payload.message
          }
        );

    case MonthlyTaskSchedulersActionTypes.MonthlyTaskSchedulersLoaded:
      return adapter.upsertMany(action.payload.monthlyTasks, { ...state,
        errorMessage: undefined,
        monthlyTasksLoaded: true
      });

    case MonthlyTaskSchedulersActionTypes.MonthlyTasksMessagesCleared:
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