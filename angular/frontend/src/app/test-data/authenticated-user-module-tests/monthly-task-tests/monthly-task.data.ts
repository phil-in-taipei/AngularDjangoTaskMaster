import { 
  ApplyBatchSchedulerModel 
} from "src/app/models/apply-batch-schedulers-request.model";
import { DeletionResponse } from "src/app/models/deletion-response";
import { 
  MonthlyTaskAppliedQuarterlyModel,
  MonthlyTaskCreateModel, MonthlyTaskModel 
} from "src/app/models/monthly-task.model";

export const monthlyTaskCreateRequest: MonthlyTaskCreateModel = {
    monthlyTaskName: "Buy Detergent",
    dayOfMonth: 25,
  };

export const testMonthlyTask1: MonthlyTaskModel = {
    id: 1,
    monthlyTaskName: "Water the plants",
    templateSelectorString:  "Water the plants: 15th day of month ",
    dayOfMonth: 15,
  };
  
export const testMonthlyTask2: MonthlyTaskModel = {
    id: 2,
    monthlyTaskName: "Take out the trash",
    templateSelectorString:  "Take out the trash: 18th day of month ",
    dayOfMonth: 18,
  };

export const testMonthlyTask3: MonthlyTaskModel = {
    id: 3,
    monthlyTaskName: monthlyTaskCreateRequest.monthlyTaskName,
    templateSelectorString: `${
      monthlyTaskCreateRequest.monthlyTaskName
    }: ${
      monthlyTaskCreateRequest.dayOfMonth
    }th day of month`,
    dayOfMonth: monthlyTaskCreateRequest.dayOfMonth,
  };
  

export const monthlyTaskData: MonthlyTaskModel[] = [
    testMonthlyTask1, testMonthlyTask2
];

export const monthlyTaskDataAfterPost: MonthlyTaskModel[] = [
    testMonthlyTask1, testMonthlyTask2, testMonthlyTask3
];

export const monthlyTaskDeletionResponse: DeletionResponse = {
  id: testMonthlyTask3.id,
  message: "Monthly task scheduler successfully deleted!"
}

export const testMTAQ1: MonthlyTaskAppliedQuarterlyModel = {
  id: 1,
  quarter: "Q2",
  year: 2024,
  monthlyTaskSchedulerId: testMonthlyTask1.id
}

export const testMTAQ2: MonthlyTaskAppliedQuarterlyModel = {
  id: 2,
  quarter: "Q2",
  year: 2024,
  monthlyTaskSchedulerId: testMonthlyTask2.id
}

export const testMTAQ3: MonthlyTaskAppliedQuarterlyModel = {
  id: 3,
  quarter: "Q2",
  year: 2024,
  monthlyTaskSchedulerId: testMonthlyTask3.id
}

export const testMTAQPostRequest: ApplyBatchSchedulerModel = {
  recurringTaskSchedulerId: testMonthlyTask3.id,
  quarter: "Q2",
  year: 2024
}

export const mTAQQuarter2Data: MonthlyTaskAppliedQuarterlyModel[] = [
  testMTAQ1, testMTAQ2
]

export const mTAQQuarter2DataAfterPost: MonthlyTaskAppliedQuarterlyModel[] = [
  testMTAQ1, testMTAQ2, testMTAQ3
]

export const mTAQDeletionResponse: DeletionResponse = {
  id: testMTAQ3.id,
  message: "Monthly scheduler application successfully deleted!"
}
