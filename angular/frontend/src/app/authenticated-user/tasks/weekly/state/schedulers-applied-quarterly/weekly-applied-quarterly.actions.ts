import { Action } from '@ngrx/store';

import {
    WeeklyTaskAppliedQuarterlyModel
} from 'src/app/models/weekly-task.model';
//import {
//    ApplyBatchSchedulerModel
//} from 'src/app/models/apply-batch-schedulers-request.model';
import { ApplyWeeklyTaskSchedulerModel } from 'src/app/models/weekly-task.model';

export enum WeeklyTaskAppliedQuarterlyActionTypes {
    WeeklyTaskAppliedQuarterlysCleared = '[View User Logout] All Weekly Task Applied Quarterlys Removed',
    WeeklyTaskAppliedQuarterlysRequested = '[Weekly Tasks Applied Quarterly Component View] Weekly Task Applied Quarterlys Requested',
    WeeklyTaskAppliedQuarterlysRequestCancelled= '[Weekly Tasks Applied Quarterly Component View] Weekly Task Applied Quarterlys Request Cancelled',
    WeeklyTaskAppliedQuarterlysLoaded = '[Weekly Task Applied Quarterly API] Weekly Task Applied Quarterlys Loaded',
    WeeklyTaskAppliedQuarterlyCreateSubmitted = '[Create Weekly Task Page] Weekly Task Applied Quarterly Submitted',
    WeeklyTaskAppliedQuarterlyAdded = '[Create Weekly Task Applied Quarterly Page] Newly Created Weekly Applied Quarterly Added',
    WeeklyTaskAppliedQuarterlyCreationCancelled = '[Create Weekly Task Applied Quarterly Page] Weekly Task Applied Quarterly Creation Cancelled',
    WeeklyTaskAppliedQuarterlyDeletionCancelled = '[Weekly Task Applied Quarterlys Page] Removal of Weekly Task Applied Quarterly Cancelled',
    WeeklyTaskAppliedQuarterlyDeletionRequested = '[Weekly Task Applied Quarterlys  Page]  Removal of Weekly Task Applied Quarterly Requested',
    WeeklyTaskAppliedQuarterlyDeletionSaved = '[Weekly Task Applied Quarterlys Page] Weekly Task Applied Quarterly Removed',
    WeeklyTasksAppliedQuarterlyMessagesCleared = '[Weekly Task Applied Quarterly List, and Submission Pages] Weekly Task Applied Quarterlys Messages Cleared',
   }

export class WeeklyTaskAppliedQuarterlysCleared implements Action {
    readonly type = WeeklyTaskAppliedQuarterlyActionTypes.WeeklyTaskAppliedQuarterlysCleared;
   }

export class WeeklyTaskAppliedQuarterlysLoaded implements Action {
    readonly type = WeeklyTaskAppliedQuarterlyActionTypes.WeeklyTaskAppliedQuarterlysLoaded;

    constructor(
      public payload: { weeklyTasks: WeeklyTaskAppliedQuarterlyModel[] }
    ) {}
   }

export class WeeklyTaskAppliedQuarterlysRequestCancelled implements Action {
    readonly type = WeeklyTaskAppliedQuarterlyActionTypes.WeeklyTaskAppliedQuarterlysRequestCancelled;

    constructor(public payload: {  err: any }) {}
   }

export class WeeklyTaskAppliedQuarterlysRequested implements Action {
    readonly type = WeeklyTaskAppliedQuarterlyActionTypes.WeeklyTaskAppliedQuarterlysRequested;

    constructor(
      public payload: { quarter: string, year: number }
    ) {}
   }

export class WeeklyTaskAppliedQuarterlyCreateSubmitted implements Action {
    readonly type = WeeklyTaskAppliedQuarterlyActionTypes.WeeklyTaskAppliedQuarterlyCreateSubmitted;

    constructor(
      public payload: { weeklyTaskAppliedQuarterly: ApplyWeeklyTaskSchedulerModel }
    ){}
   };

export class WeeklyTaskAppliedQuarterlyAdded implements Action {
    readonly type = WeeklyTaskAppliedQuarterlyActionTypes.WeeklyTaskAppliedQuarterlyAdded;

    constructor(
      public payload: { weeklyTaskAppliedQuarterly: WeeklyTaskAppliedQuarterlyModel }
    ) {}
   }

export class WeeklyTaskAppliedQuarterlyCreationCancelled implements Action {
    readonly type = WeeklyTaskAppliedQuarterlyActionTypes.WeeklyTaskAppliedQuarterlyCreationCancelled;

    constructor(public payload: {  err: any }) {}
   }

export class WeeklyTaskAppliedQuarterlyDeletionCancelled implements Action {
    readonly type = WeeklyTaskAppliedQuarterlyActionTypes.WeeklyTaskAppliedQuarterlyDeletionCancelled;

    constructor(public payload: {  err: any }) {}
   }

export class WeeklyTaskAppliedQuarterlyDeletionRequested implements Action {
    readonly type = WeeklyTaskAppliedQuarterlyActionTypes.WeeklyTaskAppliedQuarterlyDeletionRequested;

    constructor(public payload: { id: number }) {}
   }

export class WeeklyTaskAppliedQuarterlyDeletionSaved implements Action {
    readonly type = WeeklyTaskAppliedQuarterlyActionTypes.WeeklyTaskAppliedQuarterlyDeletionSaved;

    constructor(public payload: { id: number, message: string }) {}
   }

export class WeeklyTasksAppliedQuarterlyMessagesCleared implements Action {
    readonly type = WeeklyTaskAppliedQuarterlyActionTypes.WeeklyTasksAppliedQuarterlyMessagesCleared;
   }

export type WeeklyTaskAppliedQuarterlyActions =  WeeklyTaskAppliedQuarterlysCleared |
    WeeklyTaskAppliedQuarterlysLoaded | WeeklyTaskAppliedQuarterlysRequestCancelled |
    WeeklyTaskAppliedQuarterlysRequested | WeeklyTaskAppliedQuarterlyCreateSubmitted |
    WeeklyTaskAppliedQuarterlyAdded | WeeklyTaskAppliedQuarterlyCreationCancelled |
    WeeklyTaskAppliedQuarterlyDeletionCancelled |WeeklyTaskAppliedQuarterlyDeletionRequested |
    WeeklyTaskAppliedQuarterlyDeletionSaved | WeeklyTasksAppliedQuarterlyMessagesCleared;
