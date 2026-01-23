import { Action} from "@ngrx/store";
import { Update } from "@ngrx/entity";

import { 
    SingleTaskCreateModel, 
    SingleTaskRescheduleModel, 
    SingleTaskModel 
} from "src/app/models/single-task.model";

export enum SingleTaskActionTypes {
    LandingPageTasksLoaded = '[User Landing Page] Landing Page Daily Tasks Loaded',
    LandingPageTasksRequestCancelled = '[User Landing Page] Landing Page Tasks Request Cancelled',    
    LandingPageTasksRequested = '[User Landing Page] Landing Daily Tasks Batch Requested',
    DailyTasksRequested = '[Daily Tasks Page] Daily Batch Requested',
    DailyTasksRequestCancelled= '[Daily Tasks Page] Daily Batch Request Cancelled',
    DailyTasksLoaded = '[Daily Tasks API] Daily Batch Loaded',
    MonthlyTasksRequested = '[Monthly Tasks Select Page] Monthly Batch Requested',
    MonthlyTasksRequestCancelled= '[Monthly Tasks Page] Monthly Batch Request Cancelled',
    MonthlyTasksLoaded = '[Monthly Tasks API] Monthly Batch Loaded', 
    SingleTasksCleared = '[View User Logout] All Single Tasks Removed',
    SingleTaskConfirmationCancelled = '[Single Task Page] Confirmation of Single Task Completion Cancelled',
    SingleTaskConfirmationRequested = '[Single Task Page]  Confirmation of Single Task Completion Requested',
    SingleTaskConfirmationSaved = '[Single Tasks Page] Single Task Completion Confirmed',
    SingleTaskCreateSubmitted = '[Create Single Task Page] Single Task Submitted',
    SingleTaskCreatedWithDailyBatchAdded = '[Create Single Task Page] Newly Created Task with Daily Batch Added',
    SingleTaskCreationCancelled = '[Create Single Task Page] Single Task Creation Cancelled',
    SingleTaskDeletionCancelled = '[Single Task Page] Removal of Single Task Cancelled',
    SingleTaskDeletionRequested = '[Single Task Page]  Removal of Single Task Requested',
    SingleTaskDeletionSaved = '[Single Tasks Page] Single Task Removed',
    SingleTaskEditCancelled= '[Edit Single Task Page] Edit Single Task Cancelled',
    SingleTaskEditSubmitted = '[Edit Single Task Page] Edited Single Task Submitted',
    SingleTaskEditUpdated = '[Task Detail Page] Edited Single Task Updated',
    SingleTaskMessagesCleared = '[Single Task Edit, and Submission Pages] Single Task Messages Cleared',
};

export class LandingPageTasksLoaded implements Action {
    readonly type = SingleTaskActionTypes.LandingPageTasksLoaded;
  
    constructor(
        public payload: { singleTasks: SingleTaskModel[] }
    ) {}
}

export class LandingPageTasksRequestCancelled implements Action {
    readonly type = SingleTaskActionTypes.LandingPageTasksRequestCancelled;
  
    constructor(public payload: {  err: any }) {}
}

export class LandingPageTasksRequested implements Action {
    readonly type = SingleTaskActionTypes.LandingPageTasksRequested;
}

export class DailyTasksLoaded implements Action {
    readonly type = SingleTaskActionTypes.DailyTasksLoaded;
  
    constructor(
        public payload: { singleTasks: SingleTaskModel[] }
    ) {}
}

export class DailyTasksRequested implements Action {
    readonly type = SingleTaskActionTypes.DailyTasksRequested;
  
    constructor(public payload: { date: string }) {}
}

export class DailyTasksRequestCancelled implements Action {
    readonly type = SingleTaskActionTypes.DailyTasksRequestCancelled;
  
    constructor(public payload: {  err: any }) {}
}

export class MonthlyTasksRequested implements Action {
    readonly type = SingleTaskActionTypes.MonthlyTasksRequested;
  
    constructor(
        public payload: { month: number, year: number 
    }) {}
}

export class MonthlyTasksRequestCancelled implements Action {
    readonly type = SingleTaskActionTypes.MonthlyTasksRequestCancelled;
  
    constructor(public payload: {  err: any }) {}
}

export class MonthlyTasksLoaded implements Action {
    readonly type = SingleTaskActionTypes.MonthlyTasksLoaded;
  
    constructor(
        public payload: { monthlyTasks: SingleTaskModel[] }
    ) {}
}

export class SingleTasksCleared implements Action {
    readonly type = SingleTaskActionTypes.SingleTasksCleared;
}

export class SingleTaskConfirmationCancelled implements Action {
    readonly type = SingleTaskActionTypes.SingleTaskConfirmationCancelled;
  
    constructor(public payload: {  err: any }) {}
}

export class SingleTaskConfirmationRequested implements Action {
    readonly type = SingleTaskActionTypes.SingleTaskConfirmationRequested;
  
    constructor(
        public payload: { id: number }
    ){}
};

export class SingleTaskConfirmationSaved implements Action {
    readonly type = SingleTaskActionTypes.SingleTaskConfirmationSaved;
  
    constructor(public payload: {  singleTask: Update<SingleTaskModel> }) {
    }
}

export class SingleTaskCreateSubmitted implements Action {
    readonly type = SingleTaskActionTypes.SingleTaskCreateSubmitted;
  
    constructor(
        public payload: { singleTask: SingleTaskCreateModel }
    ){}
};

export class SingleTaskCreatedWithDailyBatchAdded implements Action {
    readonly type = SingleTaskActionTypes.SingleTaskCreatedWithDailyBatchAdded;
  
    constructor(
        public payload: { dailyTasks: SingleTaskModel[] }
    ) {}
}

export class SingleTaskCreationCancelled implements Action {
    readonly type = SingleTaskActionTypes.SingleTaskCreationCancelled;
  
    constructor(public payload: {  err: any }) {}
}

export class SingleTaskDeletionCancelled implements Action {
    readonly type = SingleTaskActionTypes.SingleTaskDeletionCancelled;
  
    constructor(public payload: {  err: any }) {}
}

export class SingleTaskDeletionRequested implements Action {
    readonly type = SingleTaskActionTypes.SingleTaskDeletionRequested;
  
    constructor(public payload: { id: number }) {}
}

export class SingleTaskDeletionSaved implements Action {
    readonly type = SingleTaskActionTypes.SingleTaskDeletionSaved;
  
    constructor(public payload: { id: number, message: string }) {}
}
export class SingleTaskEditCancelled implements Action {
    readonly type = SingleTaskActionTypes.SingleTaskEditCancelled;
  
    constructor(public payload: {  err: any }) {}
}

export class SingleTaskEditSubmitted implements Action {
    readonly type = SingleTaskActionTypes.SingleTaskEditSubmitted;

    constructor(public payload: 
        {  id: number, singleTask: SingleTaskRescheduleModel }) {}
}

export class SingleTaskEditUpdated implements Action {
    readonly type = SingleTaskActionTypes.SingleTaskEditUpdated;
  
    constructor(public payload: {  singleTask: Update<SingleTaskModel> }) {
    }
}

export class SingleTaskMessagesCleared implements Action {
    readonly type = SingleTaskActionTypes.SingleTaskMessagesCleared;
}

export type SingleTaskActions =  LandingPageTasksLoaded | 
    LandingPageTasksRequestCancelled | LandingPageTasksRequested |
    MonthlyTasksRequested | MonthlyTasksRequestCancelled |
    MonthlyTasksLoaded | DailyTasksLoaded | DailyTasksRequested |
    DailyTasksRequestCancelled |SingleTasksCleared | 
    SingleTaskConfirmationCancelled | SingleTaskConfirmationRequested | 
    SingleTaskConfirmationSaved | SingleTaskCreateSubmitted | 
    SingleTaskCreationCancelled | SingleTaskCreatedWithDailyBatchAdded | 
    SingleTaskDeletionCancelled | SingleTaskDeletionRequested | 
    SingleTaskDeletionSaved | SingleTaskEditCancelled | 
    SingleTaskEditSubmitted | SingleTaskEditUpdated | 
    SingleTaskMessagesCleared;