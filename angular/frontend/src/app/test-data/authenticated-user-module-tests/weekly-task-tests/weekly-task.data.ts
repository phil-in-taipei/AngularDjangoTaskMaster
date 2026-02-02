import { ApplyBatchSchedulerModel } from "src/app/models/apply-batch-schedulers-request.model";
import { DeletionResponse } from "src/app/models/deletion-response";
import { 
  WeeklyTaskAppliedQuarterlyModel,
    WeeklyTaskCreateModel, WeeklyTaskModel 
} from "src/app/models/weekly-task.model";

export const weeklyTaskCreateRequest: WeeklyTaskCreateModel = {
    weeklyTaskName: "Grocery shopping",
    dayOfWeek: "TUESDAY",
  };
  
export const testWeeklyTask1: WeeklyTaskModel = {
    id: 1,
    weeklyTaskName: "Clean the kitchen",
    templateSelectorString: "Clean the kitchen (every Sunday)",
    dayOfWeek: "SUNDAY",
  };
  
export const testWeeklyTask2: WeeklyTaskModel = {
    id: 2,
    weeklyTaskName: "Do laundry",
    templateSelectorString: "Do laundry (every Monday)",
    dayOfWeek: "MONDAY",
  };
  
export const testWeeklyTask3: WeeklyTaskModel = {
    id: 3,
    weeklyTaskName: weeklyTaskCreateRequest.weeklyTaskName,
    templateSelectorString: `${
      weeklyTaskCreateRequest.weeklyTaskName
    } (every ${
      weeklyTaskCreateRequest.dayOfWeek.charAt(0)
    }${weeklyTaskCreateRequest.dayOfWeek.slice(1).toLowerCase()}`,
    dayOfWeek: weeklyTaskCreateRequest.dayOfWeek,
  };
  
export const weeklyTaskData: WeeklyTaskModel[] = [
    testWeeklyTask1,
    testWeeklyTask2,
  ];


export const weeklyTaskDataAfterPost: WeeklyTaskModel[] = [
    testWeeklyTask1,
    testWeeklyTask2,
    testWeeklyTask3,
];
    
export const weeklyTaskDeletionResponse: DeletionResponse = {
    id: testWeeklyTask3.id,
    message: "Weekly task scheduler successfully deleted!",
  };

  export const testWTAQ1: WeeklyTaskAppliedQuarterlyModel = {
  id: 1,
  quarter: "Q2",
  year: 2024,
  weeklyTaskSchedulerId: testWeeklyTask1.id
}

export const testWTAQ2: WeeklyTaskAppliedQuarterlyModel = {
  id: 2,
  quarter: "Q2",
  year: 2024,
  weeklyTaskSchedulerId: testWeeklyTask2.id
}

export const testWTAQ3: WeeklyTaskAppliedQuarterlyModel = {
  id: 3,
  quarter: "Q2",
  year: 2024,
  weeklyTaskSchedulerId: testWeeklyTask3.id
}

export const testWTAQPostRequest: ApplyBatchSchedulerModel = {
  recurringTaskSchedulerId: testWeeklyTask3.id,
  quarter: "Q2",
  year: 2024
}

export const wTAQQuarter2Data: WeeklyTaskAppliedQuarterlyModel[] = [
  testWTAQ1, testWTAQ2
]

export const wTAQQuarter2DataAfterPost: WeeklyTaskAppliedQuarterlyModel[] = [
  testWTAQ1, testWTAQ2, testWTAQ3
]

export const wTAQDeletionResponse: DeletionResponse = {
  id: testWTAQ3.id,
  message: "Weekly scheduler application successfully deleted!"
}