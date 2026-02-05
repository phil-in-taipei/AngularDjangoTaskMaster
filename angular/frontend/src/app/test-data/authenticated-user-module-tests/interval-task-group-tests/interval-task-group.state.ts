import { Dictionary } from "@ngrx/entity";

import { IntervalTaskGroupModel } from "src/app/models/interval-task-group.model";

import { 
    intervalTaskGroupData, 
    intervalTaskGroupDataAfterTaskAdded, 
    intervalTaskGroupDataAfterGroupAdded 
} from "./interval-task-group.data";

const iTGIdsPriorToGroupSubmission: number[] = [ 
    intervalTaskGroupData[0].id, 
    intervalTaskGroupData[1].id ,
];

const iTGIdsFollowingTaskSubmission: number[] = [
    intervalTaskGroupDataAfterTaskAdded[0].id,
    intervalTaskGroupDataAfterTaskAdded[1].id
]

const iTGIds: number[] = [
    intervalTaskGroupDataAfterGroupAdded[0].id, 
    intervalTaskGroupDataAfterGroupAdded[1].id ,
    intervalTaskGroupDataAfterGroupAdded[2].id,
]

const entitiesPriorToGroupSubmission:Dictionary<IntervalTaskGroupModel> = {
    '1': intervalTaskGroupData[0],
    '2': intervalTaskGroupData[1],
};

const entitiesFollowingTaskSubmission: Dictionary<IntervalTaskGroupModel> = {
    '1': intervalTaskGroupDataAfterTaskAdded[0],
    '2': intervalTaskGroupDataAfterTaskAdded[1],
}

const entities: Dictionary<IntervalTaskGroupModel> = {
    '1': intervalTaskGroupDataAfterGroupAdded[0],
    '2': intervalTaskGroupDataAfterGroupAdded[1],
    '3': intervalTaskGroupDataAfterGroupAdded[2]
}

const deletionFailureMessageGroup: string = "Error! Interval Task Group Deletion Failed!";
const deletionFailureMessageTask: string = "Error! Interval Task Scheduler Deletion Failed!";
const deletionSuccessMessageGroup: string = 'Interval Task Group successfully deleted!';
const deletionSuccessMessageTask: string = 'You have successfully removed a task from the group!';
const fetchFailureMessage: string = 'Error fetching interval task groups!';
const submissionFailureMessageGroup: string = "Error submitting interval task group!";
const submissionFailureMessageTask: string = "Error submitting interval task scheduler!";
const submissionSuccessMessageGroup: string = 'Interval task group successfully submitted!';
const submissionSuccessMessageTask: string = 'You have successfully added a task to the group!';

export const stateFollowingNewIntervalTaskGroupDeletion = {
    intervalTasks: {
      ids: iTGIdsPriorToGroupSubmission,
      entities: entitiesPriorToGroupSubmission,
      errorMessage: undefined,
      intervalTaskGroupsLoaded: true,
      successMessage: deletionSuccessMessageGroup
    }
}

export const stateFollowingNewIntervalTaskGroupDeletionFailure = {
    intervalTasks: {
      ids: iTGIds,
      entities: entities,
      errorMessage: deletionFailureMessageGroup,
      intervalTaskGroupsLoaded: true,
      successMessage: undefined
    }
};

export const statePriorToNewIntervalTaskGroupSubmission = {
    intervalTasks: {
      ids: iTGIdsPriorToGroupSubmission,
      entities: entitiesPriorToGroupSubmission,
      errorMessage: undefined,
      intervalTaskGroupsLoaded: true,
      successMessage: undefined
    }
};


export const stateAfterNewIntervalTaskGroupSubmission = {
    intervalTasks: {
      ids: iTGIds,
      entities: entities,
      errorMessage: undefined,
      intervalTaskGroupsLoaded: true,
      successMessage: submissionSuccessMessageGroup
    }
};

export const stateAfterNewIntervalTaskSubmission = {
    intervalTasks: {
      ids: iTGIdsFollowingTaskSubmission,
      entities: entitiesFollowingTaskSubmission,
      errorMessage: undefined,
      intervalTaskGroupsLoaded: true,
      successMessage: submissionSuccessMessageTask
    }
};

export const stateAfterNewIntervalTaskSubmissionFailure = {
    intervalTasks: {
        ids: iTGIds,
        entities: entities,
        errorMessage: submissionFailureMessageTask,
        intervalTaskGroupsLoaded: true,
        successMessage: undefined
    }
};

export const stateAfterNewIntervalTaskGroupSubmissionFailure = {
    intervalTasks: {
        ids: iTGIdsPriorToGroupSubmission,
        entities: entitiesPriorToGroupSubmission,
        errorMessage: submissionFailureMessageGroup,
        intervalTaskGroupsLoaded: true,
        successMessage: undefined
    }
};

export const stateFollowingNewIntervalTaskDeletion = {
    intervalTasks: {
        ids: iTGIdsPriorToGroupSubmission,
        entities: entitiesPriorToGroupSubmission,
        errorMessage: undefined,
        intervalTaskGroupsLoaded: true,
        successMessage: deletionSuccessMessageTask
      }
}
