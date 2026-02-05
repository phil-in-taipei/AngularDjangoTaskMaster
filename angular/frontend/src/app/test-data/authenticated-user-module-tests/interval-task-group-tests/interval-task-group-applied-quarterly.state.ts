import { Dictionary } from "@ngrx/entity";

import {
    iTGAQQuarter2Data, iTGAQQuarter2DataAfterPost
} from "./interval-task-group.data";
import { IntervalTaskGroupAppliedQuarterlyModel } from "src/app/models/interval-task-group.model";

const iTGAQIdsPriorToSubmission: number[] = [
    iTGAQQuarter2Data[0].id,
    iTGAQQuarter2Data[1].id ,
];

const iTGAQIds:number[] = [
    iTGAQQuarter2DataAfterPost[0].id,
    iTGAQQuarter2DataAfterPost[1].id,
    iTGAQQuarter2DataAfterPost[2].id
];

const entitiesPriorToSubmission:Dictionary<IntervalTaskGroupAppliedQuarterlyModel> = {
    '1': iTGAQQuarter2Data[0],
    '2': iTGAQQuarter2Data[1],
};

const entities:Dictionary<IntervalTaskGroupAppliedQuarterlyModel> = {
    '1': iTGAQQuarter2DataAfterPost[0],
    '2': iTGAQQuarter2DataAfterPost[1],
    '3': iTGAQQuarter2DataAfterPost[2],
};

const deletionFailureMessage: string = "Error! Interval Task Group Applied Quarterly Deletion Failed!";
const deletionSuccessMessage: string = 'Interval Task Group Application successfully deleted!';
const fetchingFailureMessage: string = "Error fetching interval tasks groups applied quarterly!";
const submissionFailureMessage: string = "Error submitting interval task group applied quarterly!";
const submissionSuccessMessage: string = 'Interval Task Group Applied Quarterly successfully submitted!';

export const stateFollowingNewITGAQDeletion = {
    intervalTasksGroupsAppliedQuarterly: {
        ids: iTGAQIdsPriorToSubmission,
        entities: entitiesPriorToSubmission,
        errorMessage: undefined,
        intervalTaskGroupAppliedQuarterlysLoaded: true,
        successMessage: deletionSuccessMessage
    }
};

export const stateFollowingNewITGAQDeletionFailure = {
    intervalTasksGroupsAppliedQuarterly: {
        ids: iTGAQIds,
        entities: entities,
        errorMessage: deletionFailureMessage,
        intervalTaskGroupAppliedQuarterlysLoaded: true,
        successMessage: undefined
    }
};

export const statePriorToNewITGAQSubmission = {
    intervalTasksGroupsAppliedQuarterly: {
        ids: iTGAQIdsPriorToSubmission,
        entities: entitiesPriorToSubmission,
        errorMessage: undefined,
        intervalTaskGroupAppliedQuarterlysLoaded: true,
        successMessage: undefined
    }
};

export const stateAfterNewITGAQSubmission = {
    intervalTasksGroupsAppliedQuarterly: {
        ids: iTGAQIds,
        entities: entities,
        errorMessage: undefined,
        intervalTaskGroupAppliedQuarterlysLoaded: true,
        successMessage: submissionSuccessMessage
    }
};

export const stateAfterNewITGAQSubmissionFailure = {
    intervalTasksGroupsAppliedQuarterly: {
        ids: iTGAQIdsPriorToSubmission,
        entities: entitiesPriorToSubmission,
        errorMessage: submissionFailureMessage,
        intervalTaskGroupAppliedQuarterlysLoaded: true,
        successMessage: undefined
    }
};
