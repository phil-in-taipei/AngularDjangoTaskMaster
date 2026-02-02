import { 
    DeletionResponse 
} from "src/app/models/deletion-response";
import { 
    SingleTaskModel, SingleTaskCreateModel,
    SingleTaskRescheduleModel
} from "src/app/models/single-task.model";

export const singleTaskCreateRequest: SingleTaskCreateModel = {
    taskName: "Test Task 1",
    date: "2024-03-25"
};

export const singleTaskDeletionResponse: DeletionResponse = {
    id: 3,
    message: "Task successfully deleted!"
}

export const testSingleTask1: SingleTaskModel = {
    id: 1,
    taskName: singleTaskCreateRequest.taskName,
    date: singleTaskCreateRequest.date,        
    status: "PENDING",
    comments: null,
    createdDateTime: "2024-03-25T10:56:38.425",
    updatedDateTime: "2024-03-25T10:56:38.425"
};

export const testSingleTask2: SingleTaskModel = {
    id: 2,
    taskName: "Test Task 2",
    date: "2024-03-25",        
    status: "PENDING",
    comments: null,
    createdDateTime: "2024-03-25T10:58:38.425",
    updatedDateTime: "2024-03-25T10:58:38.425"
};

export const testSingleTask2PostConfirmation: SingleTaskModel = {
    id: 2,
    taskName: "Test Task 2",
    date: "2024-03-25",        
    status: "COMPLETED",
    comments: null,
    createdDateTime: "2024-03-25T10:58:38.425",
    updatedDateTime: "2024-04-25T10:58:38.425"
};

export const singleTaskMarch25thData: SingleTaskModel[] = [
    testSingleTask1, testSingleTask2
];

export const testSingleTask3: SingleTaskModel = {
    id: 3,
    taskName: "Test Task 3",
    date: "2024-03-27",        
    status: "PENDING",
    comments: null,
    createdDateTime: "2024-03-27T10:58:38.425",
    updatedDateTime: "2024-03-27T10:58:38.425"
};

export const singleTaskMarchData: SingleTaskModel[] = [
    testSingleTask2, testSingleTask1, testSingleTask3
];

export const testSingleTask4: SingleTaskModel = {
    id: 4,
    taskName: "Test Task 4",
    date: "2024-04-25",        
    status: "PENDING",
    comments: null,
    createdDateTime: "2024-04-25T10:58:38.425",
    updatedDateTime: "2024-04-25T10:58:38.425"
};

// this will reschedule the 3rd task from March to April
// on the same date as the 4th task
export const singleTask3RescheduleRequest: SingleTaskRescheduleModel = {
    comments: "Test Reschedule",
    date: testSingleTask4.date
};


export const testSingleTask3PostRescheduling: SingleTaskModel = {
    id: 3,
    taskName: "Test Task 3",
    date: singleTask3RescheduleRequest.date,        
    status: "DEFERRED",
    comments: singleTask3RescheduleRequest.comments,
    createdDateTime: "2024-03-27T10:58:38.425",
    updatedDateTime: "2024-03-27T10:58:38.425"
};

export const singleTaskDataApril: SingleTaskModel[] = [
    testSingleTask4
];

export const singleTaskDataAprilPostReschedule: SingleTaskModel[] = [
    testSingleTask4, testSingleTask3PostRescheduling
];

export const singleTaskDataMarchPostReschedule: SingleTaskModel[] = [
    testSingleTask1, testSingleTask2,
];

export const singleTaskDataAprilPostDeletion: SingleTaskModel[] = [];

