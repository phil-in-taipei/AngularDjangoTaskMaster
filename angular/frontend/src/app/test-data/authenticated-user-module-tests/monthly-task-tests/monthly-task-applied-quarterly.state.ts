import { Dictionary } from "@ngrx/entity";

import { 
    mTAQQuarter2Data, mTAQQuarter2DataAfterPost 
} from "./monthly-task.data";
import { MonthlyTaskAppliedQuarterlyModel } from "src/app/models/monthly-task.model";

const mTAQIdsPriorToSubmission: number[] = [ 
    mTAQQuarter2Data[0].id, 
    mTAQQuarter2Data[1].id ,
];

const mTAQIds:number[] = [ 
    mTAQQuarter2DataAfterPost[0].id, 
    mTAQQuarter2DataAfterPost[1].id, 
    mTAQQuarter2DataAfterPost[2].id 
];

const entitiesPriorToSubmission:Dictionary<MonthlyTaskAppliedQuarterlyModel> = {
    '1': mTAQQuarter2Data[0],
    '2': mTAQQuarter2Data[1],
};

const entities:Dictionary<MonthlyTaskAppliedQuarterlyModel> = {
    '1': mTAQQuarter2DataAfterPost[0],
    '2': mTAQQuarter2DataAfterPost[1],
    '3': mTAQQuarter2DataAfterPost[2],
};

const deletionFailureMessage: string = "Error! Monthly Task Applied Quarterly Deletion Failed!";
const deletionSuccessMessage: string = 'Monthly Task Application successfully deleted!';
const fetchingFailureMessage: string = "Error fetching monthly tasks applied quarterly!";
const submissionFailureMessage: string = "Error submitting monthly task applied quarterly!";
const submissionSuccessMessage: string = 'Monthly Task Applied Quarterly successfully submitted!';

export const stateFollowingNewMTAQDeletion = {
    monthlyTasksAppliedQuarterly: {
      ids: mTAQIdsPriorToSubmission,
      entities: entitiesPriorToSubmission,
      errorMessage: undefined,
      monthlyTaskAppliedQuarterlysLoaded: true,
      successMessage: deletionSuccessMessage
    }
};

export const stateFollowingNewMTAQDeletionFailure = {
    monthlyTasksAppliedQuarterly: {
      ids: mTAQIds,
      entities: entities,
      errorMessage: deletionFailureMessage,
      monthlyTaskAppliedQuarterlysLoaded: true,
      successMessage: undefined
    }
};

export const statePriorToNewMTAQSubmission = {
    monthlyTasksAppliedQuarterly: {
      ids: mTAQIdsPriorToSubmission,
      entities: entitiesPriorToSubmission,
      errorMessage: undefined,
      monthlyTaskAppliedQuarterlysLoaded: true,
      successMessage: undefined
    }
};

export const stateAfterNewMTAQSubmission = {
    monthlyTasksAppliedQuarterly: {
      ids: mTAQIds,
      entities: entities,
      errorMessage: undefined,
      monthlyTaskAppliedQuarterlysLoaded: true,
      successMessage: submissionSuccessMessage
    }
};

export const stateAfterNewMTAQSubmissionFailure = {
    monthlyTasksAppliedQuarterly: {
      ids: mTAQIdsPriorToSubmission,
      entities: entitiesPriorToSubmission,
      errorMessage: submissionFailureMessage,
      monthlyTaskAppliedQuarterlysLoaded: true,
      successMessage: undefined
    }
};
