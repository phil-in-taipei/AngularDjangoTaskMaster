import { Dictionary } from "@ngrx/entity";

import { 
    weeklyTaskData, weeklyTaskDataAfterPost 
  } from "./weekly-task.data";
import { WeeklyTaskModel } from "src/app/models/weekly-task.model";
  
const weeklyTaskIdsPriorToSubmission: number[] = [
    weeklyTaskData[0].id,
    weeklyTaskData[1].id,
  ];
  
const weeklyTaskIds: number[] = [
    weeklyTaskDataAfterPost[0].id,
    weeklyTaskDataAfterPost[1].id,
    weeklyTaskDataAfterPost[2].id,
  ];
  
const entitiesPriorToSubmission: Dictionary<WeeklyTaskModel> = {
    '1': weeklyTaskData[0],
    '2': weeklyTaskData[1],
  };
  
const entities: Dictionary<WeeklyTaskModel> = {
    '1': weeklyTaskDataAfterPost[0],
    '2': weeklyTaskDataAfterPost[1],
    '3': weeklyTaskDataAfterPost[2],
  };

const deletionFailureMessage: string = "Error! Weekly Task Scheduler Deletion Failed!";
const deletionSuccessMessage: string = 'Weekly Task Scheduler successfully deleted!';
const fetchFailureMessage: string = 'Error fetching weekly tasks!';
const submissionFailureMessage: string = "Error submitting weekly task scheduler!";
const submissionSuccessMessage: string = 'Weekly Task Scheduler successfully submitted!';
  

export const stateFollowingNewWeeklyTaskDeletion = {
  weeklyTasks: {
    ids: weeklyTaskIdsPriorToSubmission,
    entities: entitiesPriorToSubmission,
    errorMessage: undefined,
    weeklyTasksLoaded: true,
    successMessage: deletionSuccessMessage
  }
};

export const stateFollowingNewWeeklyTaskDeletionFailure = {
  weeklyTasks: {
    ids: weeklyTaskIds,
    entities: entities,
    errorMessage: deletionFailureMessage,
    weeklyTasksLoaded: true,
    successMessage: undefined
  }
};

export const statePriorToNewWeeklyTaskSubmission = {
    weeklyTasks: {
      ids: weeklyTaskIdsPriorToSubmission,
      entities: entitiesPriorToSubmission,
      errorMessage: undefined,
      weeklyTasksLoaded: true,
      successMessage: undefined
    }
  };
  
export const stateAfterNewWeeklyTaskSubmission = {
    weeklyTasks: {
      ids: weeklyTaskIds,
      entities: entities,
      errorMessage: undefined,
      weeklyTasksLoaded: true,
      successMessage: submissionSuccessMessage
    }
  };
  
export const stateAfterNewWeeklyTaskSubmissionFailure = {
    weeklyTasks: {
      ids: weeklyTaskIdsPriorToSubmission,
      entities: entitiesPriorToSubmission,
      errorMessage: submissionFailureMessage,
      weeklyTasksLoaded: true,
      successMessage: undefined
    }
  };