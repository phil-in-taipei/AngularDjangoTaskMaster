import { Action } from '@ngrx/store';

import {
    IntervalTaskGroupAppliedQuarterlyModel
} from 'src/app/models/interval-task-group.model';
import {
    ApplyBatchSchedulerModel
} from 'src/app/models/apply-batch-schedulers-request.model';

export enum IntervalTaskGroupAppliedQuarterlyActionTypes {
    IntervalTaskGroupAppliedQuarterlysCleared = '[View User Logout] All Interval Task Group Applied Quarterlys Removed',
    IntervalTaskGroupAppliedQuarterlysRequested = '[Interval Tasks Applied Quarterly Component View] Interval Task Group Applied Quarterlys Requested',
    IntervalTaskGroupAppliedQuarterlysRequestCancelled= '[Interval Tasks Applied Quarterly Component View] Interval Task Group Applied Quarterlys Request Cancelled',
    IntervalTaskGroupAppliedQuarterlysLoaded = '[Interval Task Group Applied Quarterly API] Interval Task Group Applied Quarterlys Loaded',
    IntervalTaskGroupAppliedQuarterlyCreateSubmitted = '[Create Interval Task Page] Interval Task Group Applied Quarterly Submitted',
    IntervalTaskGroupAppliedQuarterlyAdded = '[Create Interval Task Group Applied Quarterly Page] Newly Created Interval Applied Quarterly Added',
    IntervalTaskGroupAppliedQuarterlyCreationCancelled = '[Create Interval Task Group Applied Quarterly Page] Interval Task Group Applied Quarterly Creation Cancelled',
    IntervalTaskGroupAppliedQuarterlyDeletionCancelled = '[Interval Task Group Applied Quarterlys Page] Removal of Interval Task Group Applied Quarterly Cancelled',
    IntervalTaskGroupAppliedQuarterlyDeletionRequested = '[Interval Task Group Applied Quarterlys  Page]  Removal of Interval Task Group Applied Quarterly Requested',
    IntervalTaskGroupAppliedQuarterlyDeletionSaved = '[Interval Task Group Applied Quarterlys Page] Interval Task Group Applied Quarterly Removed',
    IntervalTasksAppliedQuarterlyMessagesCleared = '[Interval Task Group Applied Quarterly List, and Submission Pages] Interval Task Group Applied Quarterlys Messages Cleared',
   }

   export class IntervalTaskGroupAppliedQuarterlysCleared implements Action {
    readonly type = IntervalTaskGroupAppliedQuarterlyActionTypes
                    .IntervalTaskGroupAppliedQuarterlysCleared;
   }

   export class IntervalTaskGroupAppliedQuarterlysLoaded implements Action {
    readonly type = IntervalTaskGroupAppliedQuarterlyActionTypes
                    .IntervalTaskGroupAppliedQuarterlysLoaded;

    constructor(
      public payload: { intervalTasks: IntervalTaskGroupAppliedQuarterlyModel[] }
    ) {}
   }

   export class IntervalTaskGroupAppliedQuarterlysRequestCancelled implements Action {
    readonly type = IntervalTaskGroupAppliedQuarterlyActionTypes
                    .IntervalTaskGroupAppliedQuarterlysRequestCancelled;

    constructor(public payload: {  err: any }) {}
   }

   export class IntervalTaskGroupAppliedQuarterlysRequested implements Action {
    readonly type = IntervalTaskGroupAppliedQuarterlyActionTypes
                    .IntervalTaskGroupAppliedQuarterlysRequested;

    constructor(
      public payload: { quarter: string, year: number }
    ) {}
   }

   export class IntervalTaskGroupAppliedQuarterlyCreateSubmitted implements Action {
    readonly type = IntervalTaskGroupAppliedQuarterlyActionTypes
                    .IntervalTaskGroupAppliedQuarterlyCreateSubmitted;

    constructor(
        public payload: { 
            intervalTaskGroupAppliedQuarterly: ApplyBatchSchedulerModel 
        }
    ){}
   };

   export class IntervalTaskGroupAppliedQuarterlyAdded implements Action {
    readonly type = IntervalTaskGroupAppliedQuarterlyActionTypes
                    .IntervalTaskGroupAppliedQuarterlyAdded;

    constructor(
        public payload: { 
            intervalTaskGroupAppliedQuarterly: IntervalTaskGroupAppliedQuarterlyModel 
        }
    ) {}
   }

   export class IntervalTaskGroupAppliedQuarterlyCreationCancelled implements Action {
    readonly type = IntervalTaskGroupAppliedQuarterlyActionTypes
                    .IntervalTaskGroupAppliedQuarterlyCreationCancelled;

    constructor(public payload: {  err: any }) {}
   }

   export class IntervalTaskGroupAppliedQuarterlyDeletionCancelled implements Action {
    readonly type = IntervalTaskGroupAppliedQuarterlyActionTypes
                    .IntervalTaskGroupAppliedQuarterlyDeletionCancelled;

    constructor(public payload: {  err: any }) {}
   }

   export class IntervalTaskGroupAppliedQuarterlyDeletionRequested implements Action {
    readonly type = IntervalTaskGroupAppliedQuarterlyActionTypes
                    .IntervalTaskGroupAppliedQuarterlyDeletionRequested;

    constructor(public payload: { id: number }) {}
   }

   export class IntervalTaskGroupAppliedQuarterlyDeletionSaved implements Action {
    readonly type = IntervalTaskGroupAppliedQuarterlyActionTypes
                    .IntervalTaskGroupAppliedQuarterlyDeletionSaved;

    constructor(public payload: { id: number, message: string }) {}
   }

   export class IntervalTasksAppliedQuarterlyMessagesCleared implements Action {
    readonly type = IntervalTaskGroupAppliedQuarterlyActionTypes
                    .IntervalTasksAppliedQuarterlyMessagesCleared;
   }

   export type IntervalTaskGroupAppliedQuarterlyActions =  
   IntervalTaskGroupAppliedQuarterlysCleared |
    IntervalTaskGroupAppliedQuarterlysLoaded | 
    IntervalTaskGroupAppliedQuarterlysRequestCancelled |
    IntervalTaskGroupAppliedQuarterlysRequested | 
    IntervalTaskGroupAppliedQuarterlyCreateSubmitted |
    IntervalTaskGroupAppliedQuarterlyAdded | 
    IntervalTaskGroupAppliedQuarterlyCreationCancelled |
    IntervalTaskGroupAppliedQuarterlyDeletionCancelled |
    IntervalTaskGroupAppliedQuarterlyDeletionRequested |
    IntervalTaskGroupAppliedQuarterlyDeletionSaved | 
    IntervalTasksAppliedQuarterlyMessagesCleared;
