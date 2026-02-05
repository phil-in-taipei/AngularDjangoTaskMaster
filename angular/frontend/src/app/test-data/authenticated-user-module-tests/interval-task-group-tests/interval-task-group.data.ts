import { DeletionResponse } from "src/app/models/deletion-response";
import { 
    ApplyBatchSchedulerModel 
} from "src/app/models/apply-batch-schedulers-request.model";
import { 
    IntervalTaskGroupAppliedQuarterlyModel,
    IntervalTaskModel, 
    IntervalTaskCreateModel, 
    IntervalTaskGroupCreateModel,
    IntervalTaskGroupModel 
} from "src/app/models/interval-task-group.model";

export const intervalTaskCreateRequest: IntervalTaskCreateModel = {
    intervalTaskGroupId: 1,
    intervalTaskName: "Perform a Task"
}

export const testIntervalTask1: IntervalTaskModel = {
    id: 1,
    intervalTaskName: intervalTaskCreateRequest.intervalTaskName
}

export const intervalTaskGroupCreateRequest: IntervalTaskGroupCreateModel = {
    intervalInDays: 3,
    taskGroupName: "Interval Task Group 3"
}

export const testIntervalTaskGroup1: IntervalTaskGroupModel = {
    id: 1,
    intervalInDays: 2,
    taskGroupName: "Interval Task Group 1",
    templateSelectorString: "Interval Task Group 1 (Every 2 days)",
    intervalTasks: []
}

export const testIntervalTaskGroup1WithTask: IntervalTaskGroupModel = {
    id: 1,
    intervalInDays: 2,
    taskGroupName: "Interval Task Group 1",
    templateSelectorString: "Interval Task Group 1 (Every 2 days)",
    intervalTasks: [testIntervalTask1, ]
}

export const testIntervalTaskGroup2: IntervalTaskGroupModel = {
    id: 2,
    intervalInDays: 5,
    taskGroupName: "Interval Task Group 2",
    templateSelectorString: "Interval Task Group 1 (Every 5 days)",
    intervalTasks: []
}

export const testIntervalTaskGroup3: IntervalTaskGroupModel = {
    id: 3,
    intervalInDays: 3,
    taskGroupName: "Interval Task Group 3",
    templateSelectorString: "Interval Task Group 3 (Every 3 days)",
    intervalTasks: []
}

export const intervalTaskGroupData: IntervalTaskGroupModel[] = [
    testIntervalTaskGroup1, testIntervalTaskGroup2
]

export const intervalTaskGroupDataAfterTaskAdded: IntervalTaskGroupModel[] = [
    testIntervalTaskGroup1WithTask, testIntervalTaskGroup2
]

export const intervalTaskGroupDataAfterGroupAdded: IntervalTaskGroupModel[] = [
    testIntervalTaskGroup1, testIntervalTaskGroup2, testIntervalTaskGroup3
]

export const intervalTaskGroupDeletionResponse: DeletionResponse = {
    id: testIntervalTaskGroup3.id,
    message: "Interval task group successfully deleted!"
  }

export const testITGAQ1: IntervalTaskGroupAppliedQuarterlyModel = {
    id: 1,
    quarter: "Q2",
    year: 2024,
    intervalTaskGroupId: testIntervalTask1.id
  }
  
export const testITGAQ2: IntervalTaskGroupAppliedQuarterlyModel = {
    id: 2,
    quarter: "Q2",
    year: 2024,
    intervalTaskGroupId: testIntervalTaskGroup2.id
  }
  
export const testITGAQ3: IntervalTaskGroupAppliedQuarterlyModel = {
    id: 3,
    quarter: "Q2",
    year: 2024,
    intervalTaskGroupId: testIntervalTaskGroup3.id
  }
  
export const testITGAQPostRequest: ApplyBatchSchedulerModel = {
    recurringTaskSchedulerId: testIntervalTaskGroup3.id,
    quarter: "Q2",
    year: 2024
  }
  
export const iTGAQQuarter2Data: IntervalTaskGroupAppliedQuarterlyModel[] = [
    testITGAQ1, testITGAQ2
  ]
  
export const iTGAQQuarter2DataAfterPost: IntervalTaskGroupAppliedQuarterlyModel[] = [
    testITGAQ1, testITGAQ2, testITGAQ3
  ]
  
export const iTGAQDeletionResponse: DeletionResponse = {
    id: testITGAQ3.id,
    message: "Interval task application successfully deleted!"
  }
