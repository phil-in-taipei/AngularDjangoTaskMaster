import { Action} from "@ngrx/store";

import { 
    MonthlyTaskCreateModel, MonthlyTaskModel 
} from "src/app/models/monthly-task.model";

export enum MonthlyTaskSchedulersActionTypes {
  MonthlyTaskSchedulersCleared = '[View User Logout] All Monthly Task Schedulers Removed',
  MonthlyTaskSchedulersRequested = '[Monthly Tasks Component View] Monthly Task Schedulers Requested',
  MonthlyTaskSchedulersRequestCancelled= '[Monthly Tasks Component View] Monthly Task Schedulers Request Cancelled',
  MonthlyTaskSchedulersLoaded = '[Monthly Task Schedulers API] Monthly Task Schedulers Loaded',
  MonthlyTaskSchedulerCreateSubmitted = '[Create Monthly Task Page] Monthly Task Submitted',
  MonthlyTaskSchedulerAdded = '[Create Monthly Task Page] Newly Created Task with Daily Batch Added',
  MonthlyTaskSchedulerCreationCancelled = '[Create Monthly Task Page] Monthly Task Creation Cancelled',
  MonthlyTaskSchedulerDeletionCancelled = '[Monthly Task Schedulers Page] Removal of Monthly Task Cancelled',
  MonthlyTaskSchedulerDeletionRequested = '[Monthly Task Schedulers  Page]  Removal of Monthly Task Requested',
  MonthlyTaskSchedulerDeletionSaved = '[Monthly Task Schedulers Page] Monthly Task Removed',
  MonthlyTasksMessagesCleared = '[Monthly Task List, and Submission Pages] Monthly Task Messages Cleared',
}

export class MonthlyTaskSchedulersCleared implements Action {
  readonly type = MonthlyTaskSchedulersActionTypes.MonthlyTaskSchedulersCleared;
}

export class MonthlyTaskSchedulersLoaded implements Action {
  readonly type = MonthlyTaskSchedulersActionTypes.MonthlyTaskSchedulersLoaded;

  constructor(
    public payload: { monthlyTasks: MonthlyTaskModel[] }
  ) {}
}

export class MonthlyTaskSchedulersRequestCancelled implements Action {
  readonly type = MonthlyTaskSchedulersActionTypes.MonthlyTaskSchedulersRequestCancelled;

  constructor(public payload: {  err: any }) {}
}

export class MonthlyTaskSchedulersRequested implements Action {
  readonly type = MonthlyTaskSchedulersActionTypes.MonthlyTaskSchedulersRequested;
}

export class MonthlyTaskSchedulerCreateSubmitted implements Action {
  readonly type = MonthlyTaskSchedulersActionTypes.MonthlyTaskSchedulerCreateSubmitted;

  constructor(
    public payload: { monthlyTask: MonthlyTaskCreateModel }
  ){}
};

export class MonthlyTaskSchedulerAdded implements Action {
  readonly type = MonthlyTaskSchedulersActionTypes.MonthlyTaskSchedulerAdded;

  constructor(
    public payload: { monthlyTaskScheduler: MonthlyTaskModel }
  ) {}
}

export class MonthlyTaskSchedulerCreationCancelled implements Action {
  readonly type = MonthlyTaskSchedulersActionTypes.MonthlyTaskSchedulerCreationCancelled;

  constructor(public payload: {  err: any }) {}
}

export class MonthlyTaskSchedulerDeletionCancelled implements Action {
  readonly type = MonthlyTaskSchedulersActionTypes.MonthlyTaskSchedulerDeletionCancelled;

  constructor(public payload: {  err: any }) {}
}

export class MonthlyTaskSchedulerDeletionRequested implements Action {
  readonly type = MonthlyTaskSchedulersActionTypes.MonthlyTaskSchedulerDeletionRequested;

  constructor(public payload: { id: number }) {}
}

export class MonthlyTaskSchedulerDeletionSaved implements Action {
  readonly type = MonthlyTaskSchedulersActionTypes.MonthlyTaskSchedulerDeletionSaved;

  constructor(public payload: { id: number, message: string }) {}
}

export class MonthlyTasksMessagesCleared implements Action {
  readonly type = MonthlyTaskSchedulersActionTypes.MonthlyTasksMessagesCleared;
}

export type MonthlyTaskActions =  MonthlyTaskSchedulersCleared |
  MonthlyTaskSchedulersLoaded | MonthlyTaskSchedulersRequestCancelled |
  MonthlyTaskSchedulersRequested | MonthlyTaskSchedulerCreateSubmitted |
  MonthlyTaskSchedulerAdded | MonthlyTaskSchedulerCreationCancelled |
  MonthlyTaskSchedulerDeletionCancelled |MonthlyTaskSchedulerDeletionRequested |
  MonthlyTaskSchedulerDeletionSaved | MonthlyTasksMessagesCleared;
