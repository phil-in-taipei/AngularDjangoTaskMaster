import { Action} from "@ngrx/store";

import { WeeklyTaskCreateModel, WeeklyTaskModel } from "src/app/models/weekly-task.model";

export enum WeeklyTaskSchedulersActionTypes {
    WeeklyTaskSchedulersCleared = '[View User Logout] All Weekly Task Schedulers Removed',
    WeeklyTaskSchedulersRequested = '[Weekly Tasks Component View] Weekly Task Schedulers Requested',
    WeeklyTaskSchedulersRequestCancelled= '[Weekly Tasks Component View] Weekly Task Schedulers Request Cancelled',
    WeeklyTaskSchedulersLoaded = '[Weekly Task Schedulers API] Weekly Task Schedulers Loaded',
    WeeklyTaskSchedulerCreateSubmitted = '[Create Weekly Task Page] Single Task Submitted',
    WeeklyTaskSchedulerAdded = '[Create Weekly Task Page] Newly Created Task with Daily Batch Added',
    WeeklyTaskSchedulerCreationCancelled = '[Create Weekly Task Page] Weekly Task Creation Cancelled',
    WeeklyTaskSchedulerDeletionCancelled = '[Weekly Task Schedulers Page] Removal of Weekly Task Cancelled',
    WeeklyTaskSchedulerDeletionRequested = '[Weekly Task Schedulers  Page]  Removal of Weekly Task Requested',
    WeeklyTaskSchedulerDeletionSaved = '[Weekly Task Schedulers Page] Weekly Task Removed',
    WeeklyTasksMessagesCleared = '[Weekly Task List, and Submission Pages] Weekly Task Messages Cleared',
}

export class WeeklyTaskSchedulersCleared implements Action {
    readonly type = WeeklyTaskSchedulersActionTypes.WeeklyTaskSchedulersCleared;
}

export class WeeklyTaskSchedulersLoaded implements Action {
    readonly type = WeeklyTaskSchedulersActionTypes.WeeklyTaskSchedulersLoaded;
  
    constructor(
        public payload: { weeklyTasks: WeeklyTaskModel[] }
    ) {}
}

export class WeeklyTaskSchedulersRequestCancelled implements Action {
    readonly type = WeeklyTaskSchedulersActionTypes.WeeklyTaskSchedulersRequestCancelled;
  
    constructor(public payload: {  err: any }) {}
}

export class WeeklyTaskSchedulersRequested implements Action {
    readonly type = WeeklyTaskSchedulersActionTypes.WeeklyTaskSchedulersRequested;
}

export class WeeklyTaskSchedulerCreateSubmitted implements Action {
    readonly type = WeeklyTaskSchedulersActionTypes.WeeklyTaskSchedulerCreateSubmitted;
  
    constructor(
        public payload: { weeklyTask: WeeklyTaskCreateModel }
    ){}
};

export class WeeklyTaskSchedulerAdded implements Action {
    readonly type = WeeklyTaskSchedulersActionTypes.WeeklyTaskSchedulerAdded;
  
    constructor(
        public payload: { weeklyTaskScheduler: WeeklyTaskModel }
    ) {}
}

export class WeeklyTaskSchedulerCreationCancelled implements Action {
    readonly type = WeeklyTaskSchedulersActionTypes.WeeklyTaskSchedulerCreationCancelled;
  
    constructor(public payload: {  err: any }) {}
}

export class WeeklyTaskSchedulerDeletionCancelled implements Action {
    readonly type = WeeklyTaskSchedulersActionTypes.WeeklyTaskSchedulerDeletionCancelled;
  
    constructor(public payload: {  err: any }) {}
}

export class WeeklyTaskSchedulerDeletionRequested implements Action {
    readonly type = WeeklyTaskSchedulersActionTypes.WeeklyTaskSchedulerDeletionRequested;
  
    constructor(public payload: { id: number }) {}
}

export class WeeklyTaskSchedulerDeletionSaved implements Action {
    readonly type = WeeklyTaskSchedulersActionTypes.WeeklyTaskSchedulerDeletionSaved;
  
    constructor(public payload: { id: number, message: string }) {}
}

export class WeeklyTasksMessagesCleared implements Action {
    readonly type = WeeklyTaskSchedulersActionTypes.WeeklyTasksMessagesCleared;
}

export type WeeklyTaskActions =  WeeklyTaskSchedulersCleared | 
    WeeklyTaskSchedulersLoaded | WeeklyTaskSchedulersRequestCancelled |
    WeeklyTaskSchedulersRequested | WeeklyTaskSchedulerCreateSubmitted |
    WeeklyTaskSchedulerAdded | WeeklyTaskSchedulerCreationCancelled |
    WeeklyTaskSchedulerDeletionCancelled |WeeklyTaskSchedulerDeletionRequested | 
    WeeklyTaskSchedulerDeletionSaved | WeeklyTasksMessagesCleared;
