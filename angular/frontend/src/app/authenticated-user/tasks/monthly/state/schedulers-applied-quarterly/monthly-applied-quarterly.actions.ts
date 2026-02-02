import { Action } from '@ngrx/store';

import { 
    MonthlyTaskAppliedQuarterlyModel 
} from 'src/app/models/monthly-task.model';
import { ApplyMonthlyTaskSchedulerModel } from 'src/app/models/monthly-task.model';

export enum MonthlyTaskAppliedQuarterlyActionTypes {
    MonthlyTaskAppliedQuarterlysCleared = '[View User Logout] All Monthly Task Applied Quarterlys Removed',
    MonthlyTaskAppliedQuarterlysRequested = '[Monthly Tasks Applied Quarterly Component View] Monthly Task Applied Quarterlys Requested',
    MonthlyTaskAppliedQuarterlysRequestCancelled= '[Monthly Tasks Applied Quarterly Component View] Monthly Task Applied Quarterlys Request Cancelled',
    MonthlyTaskAppliedQuarterlysLoaded = '[Monthly Task Applied Quarterly API] Monthly Task Applied Quarterlys Loaded',
    MonthlyTaskAppliedQuarterlyCreateSubmitted = '[Create Monthly Task Page] Monthly Task Applied Quarterly Submitted',
    MonthlyTaskAppliedQuarterlyAdded = '[Create Monthly Task Applied Quarterly Page] Newly Created Monthly Applied Quarterly Added',
    MonthlyTaskAppliedQuarterlyCreationCancelled = '[Create Monthly Task Applied Quarterly Page] Monthly Task Applied Quarterly Creation Cancelled',
    MonthlyTaskAppliedQuarterlyDeletionCancelled = '[Monthly Task Applied Quarterlys Page] Removal of Monthly Task Applied Quarterly Cancelled',
    MonthlyTaskAppliedQuarterlyDeletionRequested = '[Monthly Task Applied Quarterlys  Page]  Removal of Monthly Task Applied Quarterly Requested',
    MonthlyTaskAppliedQuarterlyDeletionSaved = '[Monthly Task Applied Quarterlys Page] Monthly Task Applied Quarterly Removed',
    MonthlyTasksAppliedQuarterlyMessagesCleared = '[Monthly Task Applied Quarterly List, and Submission Pages] Monthly Task Applied Quarterlys Messages Cleared',
   }
   
   export class MonthlyTaskAppliedQuarterlysCleared implements Action {
    readonly type = MonthlyTaskAppliedQuarterlyActionTypes.MonthlyTaskAppliedQuarterlysCleared;
   }
   
   export class MonthlyTaskAppliedQuarterlysLoaded implements Action {
    readonly type = MonthlyTaskAppliedQuarterlyActionTypes.MonthlyTaskAppliedQuarterlysLoaded;
   
    constructor(
      public payload: { monthlyTasks: MonthlyTaskAppliedQuarterlyModel[] }
    ) {}
   }
   
   export class MonthlyTaskAppliedQuarterlysRequestCancelled implements Action {
    readonly type = MonthlyTaskAppliedQuarterlyActionTypes.MonthlyTaskAppliedQuarterlysRequestCancelled;
   
    constructor(public payload: {  err: any }) {}
   }
   
   export class MonthlyTaskAppliedQuarterlysRequested implements Action {
    readonly type = MonthlyTaskAppliedQuarterlyActionTypes.MonthlyTaskAppliedQuarterlysRequested;

    constructor(
      public payload: { quarter: string, year: number }
    ) {}
   }
   
   export class MonthlyTaskAppliedQuarterlyCreateSubmitted implements Action {
    readonly type = MonthlyTaskAppliedQuarterlyActionTypes.MonthlyTaskAppliedQuarterlyCreateSubmitted;
   
    constructor(
      public payload: { monthlyTaskAppliedQuarterly: ApplyMonthlyTaskSchedulerModel }
    ){}
   };
   
   export class MonthlyTaskAppliedQuarterlyAdded implements Action {
    readonly type = MonthlyTaskAppliedQuarterlyActionTypes.MonthlyTaskAppliedQuarterlyAdded;
   
    constructor(
      public payload: { monthlyTaskAppliedQuarterly: MonthlyTaskAppliedQuarterlyModel }
    ) {}
   }
   
   export class MonthlyTaskAppliedQuarterlyCreationCancelled implements Action {
    readonly type = MonthlyTaskAppliedQuarterlyActionTypes.MonthlyTaskAppliedQuarterlyCreationCancelled;
   
    constructor(public payload: {  err: any }) {}
   }
   
   export class MonthlyTaskAppliedQuarterlyDeletionCancelled implements Action {
    readonly type = MonthlyTaskAppliedQuarterlyActionTypes.MonthlyTaskAppliedQuarterlyDeletionCancelled;
   
    constructor(public payload: {  err: any }) {}
   }
   
   export class MonthlyTaskAppliedQuarterlyDeletionRequested implements Action {
    readonly type = MonthlyTaskAppliedQuarterlyActionTypes.MonthlyTaskAppliedQuarterlyDeletionRequested;
   
    constructor(public payload: { id: number }) {}
   }
   
   export class MonthlyTaskAppliedQuarterlyDeletionSaved implements Action {
    readonly type = MonthlyTaskAppliedQuarterlyActionTypes.MonthlyTaskAppliedQuarterlyDeletionSaved;
   
    constructor(public payload: { id: number, message: string }) {}
   }
   
   export class MonthlyTasksAppliedQuarterlyMessagesCleared implements Action {
    readonly type = MonthlyTaskAppliedQuarterlyActionTypes.MonthlyTasksAppliedQuarterlyMessagesCleared;
   }
   
   export type MonthlyTaskAppliedQuarterlyActions =  MonthlyTaskAppliedQuarterlysCleared |
    MonthlyTaskAppliedQuarterlysLoaded | MonthlyTaskAppliedQuarterlysRequestCancelled |
    MonthlyTaskAppliedQuarterlysRequested | MonthlyTaskAppliedQuarterlyCreateSubmitted |
    MonthlyTaskAppliedQuarterlyAdded | MonthlyTaskAppliedQuarterlyCreationCancelled |
    MonthlyTaskAppliedQuarterlyDeletionCancelled |MonthlyTaskAppliedQuarterlyDeletionRequested |
    MonthlyTaskAppliedQuarterlyDeletionSaved | MonthlyTasksAppliedQuarterlyMessagesCleared;
    