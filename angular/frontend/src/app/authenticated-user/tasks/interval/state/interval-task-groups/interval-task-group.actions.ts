import { Action} from "@ngrx/store";
import { Update } from "@ngrx/entity";

import { 
    IntervalTaskCreateModel, 
    IntervalTaskGroupCreateModel, 
    IntervalTaskGroupModel 
} from "src/app/models/interval-task-group.model";

export enum IntervalTaskGroupsActionTypes {
    IntervalTaskGroupsCleared = '[View User Logout] All Interval Task Groups Removed',
    IntervalTaskGroupsRequested = '[Interval Tasks Component View] Interval Task Groups Requested',
    IntervalTaskGroupsRequestCancelled= '[Interval Tasks Component View] Interval Task Groups Request Cancelled',
    IntervalTaskGroupsLoaded = '[Interval Task Groups API] Interval Task Groups Loaded',
    IntervalTaskGroupCreateSubmitted = '[Create Interval Task Page] Interval Task Group Submitted',
    IntervalTaskGroupAdded = '[Create Interval Task Page] Newly Created Interval Task Group Added',
    IntervalTaskGroupCreationCancelled = '[Create Interval Task Page] Interval Task Group Creation Cancelled',
    IntervalTaskSchedulerCreateSubmitted = '[Create Interval Task Page] Interval Task Scheduler Submitted',
    IntervalTaskSchedulerAdded = '[Create Interval Task Page] Newly Created Interval Task Scheduler Added',
    IntervalTaskSchedulerCreationCancelled = '[Create Interval Task Page] Interval Task Scheduler Creation Cancelled',
    IntervalTaskGroupDeletionCancelled = '[Interval Task Groups Page] Removal of Interval Task Group Cancelled',
    IntervalTaskGroupDeletionRequested = '[Interval Task Groups Page] Removal of Interval Task Group Requested',
    IntervalTaskGroupDeletionSaved = '[Interval Task Groups Page] Interval Task Group Removed',
    IntervalTaskSchedulerDeletionCancelled = '[Interval Task Groups Page] Removal of Interval Task Scheduler Cancelled',
    IntervalTaskSchedulerDeletionRequested = '[Interval Task Groups Page] Removal of Interval Task Scheduler Requested',
    IntervalTaskSchedulerDeletionSaved = '[Interval Task Groups Page] Interval Task Scheduler Removed',
    IntervalTasksMessagesCleared = '[Interval Task List, and Submission Pages] Interval Task Group Related Messages Cleared',
    }
    
    export class IntervalTaskGroupsCleared implements Action {
        readonly type = IntervalTaskGroupsActionTypes.IntervalTaskGroupsCleared;
    }
    
    export class IntervalTaskGroupsLoaded implements Action {
        readonly type = IntervalTaskGroupsActionTypes.IntervalTaskGroupsLoaded;
        constructor(
            public payload: { 
                intervalTaskGroups: IntervalTaskGroupModel[] 
            }
        ) {}
    }
    
    export class IntervalTaskGroupsRequestCancelled implements Action {
        readonly type = IntervalTaskGroupsActionTypes.IntervalTaskGroupsRequestCancelled;
        constructor(public payload: { err: any }) {}
    }
    
    export class IntervalTaskGroupsRequested implements Action {
        readonly type = IntervalTaskGroupsActionTypes.IntervalTaskGroupsRequested;
    }
    
    export class IntervalTaskGroupCreateSubmitted implements Action {
        readonly type = IntervalTaskGroupsActionTypes.IntervalTaskGroupCreateSubmitted;
        constructor(
            public payload: { 
                intervalTaskGroup: IntervalTaskGroupCreateModel 
            }
        ){}
    };
    
    export class IntervalTaskGroupAdded implements Action {
        readonly type = IntervalTaskGroupsActionTypes.IntervalTaskGroupAdded;
        constructor(
            public payload: { 
                intervalTaskGroup: IntervalTaskGroupModel 
            }
        ) {}
    }
    
    export class IntervalTaskGroupCreationCancelled implements Action {
        readonly type = IntervalTaskGroupsActionTypes.IntervalTaskGroupCreationCancelled;
        constructor(public payload: { err: any }) {}
    }

    export class IntervalTaskSchedulerCreateSubmitted implements Action {
        readonly type = IntervalTaskGroupsActionTypes.IntervalTaskSchedulerCreateSubmitted;
        constructor(
            public payload: { 
                intervalTask: IntervalTaskCreateModel 
            }
        ){}
    };
 
    // this will replace the interval task group object with an updated one
    // with the new interval task scheduler in the nested array of tasks
    export class IntervalTaskSchedulerAdded implements Action {
        readonly type = IntervalTaskGroupsActionTypes.IntervalTaskSchedulerAdded;
        constructor(
            public payload: { 
                intervalTaskGroup: Update<IntervalTaskGroupModel> 
            }
        ) {}
    }
 
    export class IntervalTaskSchedulerCreationCancelled implements Action {
        readonly type = IntervalTaskGroupsActionTypes.IntervalTaskSchedulerCreationCancelled;
        constructor(public payload: { err: any }) {}
    }

    export class IntervalTaskGroupDeletionCancelled implements Action {
        readonly type = IntervalTaskGroupsActionTypes.IntervalTaskGroupDeletionCancelled;
        constructor(public payload: { err: any }) {}
    }
    
    export class IntervalTaskGroupDeletionRequested implements Action {
        readonly type = IntervalTaskGroupsActionTypes.IntervalTaskGroupDeletionRequested;
        constructor(public payload: { id: number }) {}
    }
    
    export class IntervalTaskGroupDeletionSaved implements Action {
        readonly type = IntervalTaskGroupsActionTypes.IntervalTaskGroupDeletionSaved;
        constructor(
            public payload: { 
                id: number, message: string 
            }
        ) {}
    }

    export class IntervalTaskSchedulerDeletionCancelled implements Action {
        readonly type = IntervalTaskGroupsActionTypes.IntervalTaskSchedulerDeletionCancelled;
        constructor(public payload: { err: any }) {}
    }
    
    export class IntervalTaskSchedulerDeletionRequested implements Action {
        readonly type = IntervalTaskGroupsActionTypes.IntervalTaskSchedulerDeletionRequested;
        constructor(
            public payload: { 
                intervalTaskId: number, taskGroupId: number 
            }
        ) {}
    }

    // this will replace the previous interval task group object with a revised one
    // in which the deleted scheduler has been removed from the nested array of tasks
    export class IntervalTaskSchedulerDeletionSaved implements Action {
        readonly type = IntervalTaskGroupsActionTypes.IntervalTaskSchedulerDeletionSaved;
        constructor(
            public payload: { 
                intervalTaskGroup: Update<IntervalTaskGroupModel>
            }
        ) {}
    }
 
    export class IntervalTasksMessagesCleared implements Action {
        readonly type = IntervalTaskGroupsActionTypes.IntervalTasksMessagesCleared;
    }
    
    export type IntervalTaskGroupActions = IntervalTaskGroupsCleared |
    IntervalTaskGroupsLoaded | IntervalTaskGroupsRequestCancelled |
    IntervalTaskGroupsRequested | IntervalTaskGroupCreateSubmitted |
    IntervalTaskGroupAdded | IntervalTaskGroupCreationCancelled |
    IntervalTaskSchedulerCreateSubmitted | IntervalTaskSchedulerAdded | 
    IntervalTaskSchedulerCreationCancelled | IntervalTaskGroupDeletionCancelled |
    IntervalTaskGroupDeletionRequested | IntervalTaskGroupDeletionSaved | 
    IntervalTaskSchedulerDeletionCancelled | IntervalTaskSchedulerDeletionRequested |
    IntervalTaskSchedulerDeletionSaved | IntervalTasksMessagesCleared;
