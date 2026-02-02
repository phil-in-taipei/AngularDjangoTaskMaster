import { Dictionary } from "@ngrx/entity";

import { 
    monthlyTaskData, monthlyTaskDataAfterPost 
} from "./monthly-task.data";
import { MonthlyTaskModel } from "src/app/models/monthly-task.model";

const monthlyTaskIdsPriorToSubmission: number[] = [ 
    monthlyTaskData[0].id, 
    monthlyTaskData[1].id ,
];

const monthlyTaskIds:number[] = [ 
    monthlyTaskDataAfterPost[0].id, 
    monthlyTaskDataAfterPost[1].id, 
    monthlyTaskDataAfterPost[2].id 
];

const entitiesPriorToSubmission:Dictionary<MonthlyTaskModel> = {
    '1': monthlyTaskData[0],
    '2': monthlyTaskData[1],
};

const entities:Dictionary<MonthlyTaskModel> = {
    '1': monthlyTaskDataAfterPost[0],
    '2': monthlyTaskDataAfterPost[1],
    '3': monthlyTaskDataAfterPost[2],
};

const deletionFailureMessage: string = "Error! Monthly Task Scheduler Deletion Failed!";
const deletionSuccessMessage: string = 'Monthly Task Scheduler successfully deleted!';
const fetchFailureMessage: string = 'Error fetching monthly tasks!';
const submissionFailureMessage: string = "Error submitting monthly task scheduler!";
const submissionSuccessMessage: string = 'Monthly Task Scheduler successfully submitted!';

export const stateFollowingNewMonthlyTaskDeletion = {
    monthlyTasks: {
      ids: monthlyTaskIdsPriorToSubmission,
      entities: entitiesPriorToSubmission,
      errorMessage: undefined,
      monthlyTasksLoaded: true,
      successMessage: deletionSuccessMessage
    }
};

export const stateFollowingNewMonthlyTaskDeletionFailure = {
    monthlyTasks: {
      ids: monthlyTaskIds,
      entities: entities,
      errorMessage: deletionFailureMessage,
      monthlyTasksLoaded: true,
      successMessage: undefined
    }
};

export const statePriorToNewMonthlyTaskSubmission = {
    monthlyTasks: {
      ids: monthlyTaskIdsPriorToSubmission,
      entities: entitiesPriorToSubmission,
      errorMessage: undefined,
      monthlyTasksLoaded: true,
      successMessage: undefined
    }
};

export const stateAfterNewMonthlyTaskSubmission = {
    monthlyTasks: {
      ids: monthlyTaskIds,
      entities: entities,
      errorMessage: undefined,
      monthlyTasksLoaded: true,
      successMessage: submissionSuccessMessage
    }
};

export const stateAfterNewMonthlyTaskSubmissionFailure = {
    monthlyTasks: {
      ids: monthlyTaskIdsPriorToSubmission,
      entities: entitiesPriorToSubmission,
      errorMessage: submissionFailureMessage,
      monthlyTasksLoaded: true,
      successMessage: undefined
    }
};