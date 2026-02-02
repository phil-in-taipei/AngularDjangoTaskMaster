import { Dictionary } from "@ngrx/entity";
import {
    wTAQQuarter2Data, wTAQQuarter2DataAfterPost
    } from "./weekly-task.data";
import { WeeklyTaskAppliedQuarterlyModel } from "src/app/models/weekly-task.model";

const wTAQIdsPriorToSubmission: number[] = [
    wTAQQuarter2Data[0].id,
    wTAQQuarter2Data[1].id ,
    ];

const wTAQIds:number[] = [
    wTAQQuarter2DataAfterPost[0].id,
    wTAQQuarter2DataAfterPost[1].id,
    wTAQQuarter2DataAfterPost[2].id
    ];

const entitiesPriorToSubmission:Dictionary<WeeklyTaskAppliedQuarterlyModel> = {
    '1': wTAQQuarter2Data[0],
    '2': wTAQQuarter2Data[1],
    };

const entities:Dictionary<WeeklyTaskAppliedQuarterlyModel> = {
    '1': wTAQQuarter2DataAfterPost[0],
    '2': wTAQQuarter2DataAfterPost[1],
    '3': wTAQQuarter2DataAfterPost[2],
    };

const deletionFailureMessage: string = "Error! Weekly Task Applied Quarterly Deletion Failed!";
const deletionSuccessMessage: string = 'Weekly Task Application successfully deleted!';
const fetchingFailureMessage: string = "Error fetching weekly tasks applied quarterly!";
const submissionFailureMessage: string = "Error submitting weekly task applied quarterly!";
const submissionSuccessMessage: string = 'Weekly Task Applied Quarterly successfully submitted!';

 export const stateFollowingNewwTAQDeletion = {
    weeklyTasksAppliedQuarterly: {
        ids: wTAQIdsPriorToSubmission,
        entities: entitiesPriorToSubmission,
        errorMessage: undefined,
        weeklyTaskAppliedQuarterlysLoaded: true,
        successMessage: deletionSuccessMessage
     }
};

export const stateFollowingNewwTAQDeletionFailure = {
        weeklyTasksAppliedQuarterly: {
            ids: wTAQIds,
            entities: entities,
            errorMessage: deletionFailureMessage,
            weeklyTaskAppliedQuarterlysLoaded: true,
            successMessage: undefined
            }
        };

export const statePriorToNewwTAQSubmission = {
        weeklyTasksAppliedQuarterly: {
            ids: wTAQIdsPriorToSubmission,
            entities: entitiesPriorToSubmission,
            errorMessage: undefined,
            weeklyTaskAppliedQuarterlysLoaded: true,
            successMessage: undefined
        }
    };

export const stateAfterNewwTAQSubmission = {
        weeklyTasksAppliedQuarterly: {
            ids: wTAQIds,
            entities: entities,
            errorMessage: undefined,
            weeklyTaskAppliedQuarterlysLoaded: true,
            successMessage: submissionSuccessMessage
        }
};

export const stateAfterNewwTAQSubmissionFailure = {
        weeklyTasksAppliedQuarterly: {
            ids: wTAQIdsPriorToSubmission,
            entities: entitiesPriorToSubmission,
            errorMessage: submissionFailureMessage,
            weeklyTaskAppliedQuarterlysLoaded: true,
            successMessage: undefined
        }
    };
