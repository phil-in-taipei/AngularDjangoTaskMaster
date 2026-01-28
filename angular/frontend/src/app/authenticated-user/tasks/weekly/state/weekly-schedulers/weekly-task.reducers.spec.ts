import { 
    initialWeeklyTasksState, weeklyTasksReducer 
} from "./weekly-task.reducers";
import { 
    weeklyTaskData, weeklyTaskDataAfterPost 
} from "src/app/test-data/authenticated-user-module-tests/weekly-task-tests/weekly-task.data";
import { 
    stateFollowingNewWeeklyTaskDeletion,
    stateFollowingNewWeeklyTaskDeletionFailure, 
    statePriorToNewWeeklyTaskSubmission, 
    stateAfterNewWeeklyTaskSubmission, 
    stateAfterNewWeeklyTaskSubmissionFailure 
} from "src/app/test-data/authenticated-user-module-tests/weekly-task-tests/weekly-task.state";
import { 
    WeeklyTaskSchedulersCleared, WeeklyTaskSchedulersLoaded,
    WeeklyTaskSchedulerAdded,
    WeeklyTaskSchedulerCreationCancelled,
    WeeklyTaskSchedulerDeletionCancelled,
    WeeklyTaskSchedulerDeletionSaved
} from "./weekly-task.actions";

fdescribe('weeklyTaskReducer', () => {
    it('returns an initial state when cleared', () =>{
        const state = weeklyTasksReducer(
            initialWeeklyTasksState, 
            new WeeklyTaskSchedulersCleared());
        expect(state).toEqual(initialWeeklyTasksState);
    });

    it('returns the state with weekly task schedulers entities and indicates that ' 
        + 'the schedulers have been loaded', () => {
        const state = weeklyTasksReducer(initialWeeklyTasksState, 
        new WeeklyTaskSchedulersLoaded({ weeklyTasks: weeklyTaskData }));
        expect(state).toEqual(statePriorToNewWeeklyTaskSubmission.weeklyTasks);
    });


    it('returns the original state with one less weekly task entity and indicates that ' 
        + 'the third weekly task scheduler has been sucessfully deleted', () => {
        const state = weeklyTasksReducer(stateAfterNewWeeklyTaskSubmission.weeklyTasks, 
        new WeeklyTaskSchedulerDeletionSaved({ 
            id: 3, 
            message: stateFollowingNewWeeklyTaskDeletion.weeklyTasks.successMessage 
        }));
        expect(state).toEqual(stateFollowingNewWeeklyTaskDeletion.weeklyTasks);
    });


    it('returns the state after the weekly task entity has been added ' 
    + 'and indicates that the deletion of the third weekly task scheduler failed', () => {
        const state = weeklyTasksReducer(stateAfterNewWeeklyTaskSubmission.weeklyTasks, 
        new WeeklyTaskSchedulerDeletionCancelled({ 
            err: {
                error: {
                    Error: "Error! Weekly Task Scheduler Deletion Failed!"
                }
            } 
        }));
        expect(state).toEqual(stateFollowingNewWeeklyTaskDeletionFailure.weeklyTasks);
    });

    it('returns the state with new weekly task entity and indicates that ' 
        + 'the weekly task has been sucessfully submitted', () => {
        const state = weeklyTasksReducer(statePriorToNewWeeklyTaskSubmission.weeklyTasks, 
        new WeeklyTaskSchedulerAdded(
            { weeklyTaskScheduler: weeklyTaskDataAfterPost[2] }
            ));
        expect(state).toEqual(
            stateAfterNewWeeklyTaskSubmission.weeklyTasks
            );
    });


    it('returns the state with originally loaded weekly tasks entity and indicates that ' 
        + 'submission of a new weekly task scheduler has been unsucessful', () => {
        const state = weeklyTasksReducer(
            statePriorToNewWeeklyTaskSubmission.weeklyTasks, 
        new WeeklyTaskSchedulerCreationCancelled({ err: {error: {
            Error: "Error submitting weekly task scheduler!"
        } } }));
       expect(state).toEqual(
        stateAfterNewWeeklyTaskSubmissionFailure.weeklyTasks
        );
    });

});