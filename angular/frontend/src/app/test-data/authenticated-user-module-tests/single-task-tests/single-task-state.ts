import { Dictionary } from "@ngrx/entity";

import { 
    initialSingleTasksState 
} from "src/app/authenticated-user/tasks/single/state/single-task.reducers";
import { 
    singleTaskCreateRequest, singleTaskDataApril,
    singleTask3RescheduleRequest,
    singleTaskDataAprilPostDeletion,
    singleTaskDataAprilPostReschedule,
    singleTaskMarchData,
    singleTaskMarch25thData,
    singleTaskDataMarchPostReschedule
} from "./single-task-data";
import { SingleTaskModel } from "src/app/models/single-task.model";

const marchIDsPriorToSubmission: number[] = [ 
    singleTaskMarchData[0].id, 
    singleTaskMarchData[2].id ,
];

const march25IDs:number[] = [ 
    singleTaskMarch25thData[0].id, 
    singleTaskMarch25thData[1].id ,
];

const marchIDs:number[] = [ 
    singleTaskMarchData[0].id, 
    singleTaskMarchData[1].id, 
    singleTaskMarchData[2].id 
];

const marchIDsPostReschedule: number[] = [ 
    singleTaskDataMarchPostReschedule[0].id,  
    singleTaskDataMarchPostReschedule[1].id
];

const marchEntitiesPriorToSubmission:Dictionary<SingleTaskModel> = {
    '1': singleTaskMarchData[0],
    '3': singleTaskMarchData[2],
};

const marchEntities:Dictionary<SingleTaskModel> = {
    '1': singleTaskMarchData[1],
    '2': singleTaskMarchData[0],
    '3': singleTaskMarchData[2],
};

const marchEntitiesPostReschedule:Dictionary<SingleTaskModel> = {
    '1': singleTaskDataMarchPostReschedule[0],
    '2': singleTaskDataMarchPostReschedule[1],
};

const april25IDs:number[] = [ singleTaskDataApril[0].id ];

const april25IDSPostReschedule: number[] = [
    singleTaskDataAprilPostReschedule[0].id,
    singleTaskDataAprilPostReschedule[1].id,
];

const aprilEntities:Dictionary<SingleTaskModel> = {
    '4': singleTaskDataApril[0],
};

const aprilEntitiesPostReschedule:Dictionary<SingleTaskModel> = {
    '4': singleTaskDataAprilPostReschedule[0],
    '5': singleTaskDataAprilPostReschedule[1],
};

// empty after deletion of only object
const aprilEntitiesPostDeletion:Dictionary<SingleTaskModel> = {

};

const confirmationFailureMessage: string = 'Error confirming task completion!';
const deletionSuccessMessage: string = 'You have successfully deleted a task!';
const deletionFailureMessage: string = 'Error! Task Deletion Failed!';
const newSingleTaskFailureMessage: string = "Error submitting task!";
const newSingleTaskSuccessMessage: string = 'Task successfully submitted!';
const rescheduleFailureMessage: string = "Error! Task Rescheduling Failed!";
const rescheduleSuccessMessage: string = 'You have successfully rescheduled the task!';

export const statePriorToNewSingleTaskSubmitted = {
    singleTasks: {
      ids: marchIDsPriorToSubmission,
      entities: marchEntitiesPriorToSubmission,
      dateRange: undefined,
      errorMessage: undefined,
      fetchingTasksInProgress: false,
      landingPageSingleTasksLoaded: true,
      monthlySingleTasksLoaded: true,
      successMessage: undefined
    }
};

export const stateAfterNewSingleTaskSubmitted = {
    singleTasks: {
      ids: marchIDs,
      entities: marchEntities,
      dateRange: undefined,
      errorMessage: undefined,
      fetchingTasksInProgress: false,
      landingPageSingleTasksLoaded: true,
      monthlySingleTasksLoaded: true,
      successMessage: newSingleTaskSuccessMessage
    }
};

export const stateAfterNewSingleTaskSubmissionFailure = {
    singleTasks: {
      ids: marchIDsPriorToSubmission,
      entities: marchEntitiesPriorToSubmission,
      dateRange: undefined,
      errorMessage: newSingleTaskFailureMessage,
      fetchingTasksInProgress: false,
      landingPageSingleTasksLoaded: true,
      monthlySingleTasksLoaded: true,
      successMessage: undefined
    }
};

