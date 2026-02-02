import { 
    initialMonthlyTasksState, monthlyTasksReducer 
} from "./monthly-task.reducers";
import { 
    monthlyTaskDataAfterPost, monthlyTaskData 
} from "src/app/test-data/authenticated-user-module-tests/monthly-task-tests/monthly-task.data";
import { 
    statePriorToNewMonthlyTaskSubmission, 
    stateAfterNewMonthlyTaskSubmission, 
    stateAfterNewMonthlyTaskSubmissionFailure, 
    stateFollowingNewMonthlyTaskDeletion, 
    stateFollowingNewMonthlyTaskDeletionFailure
} from "src/app/test-data/authenticated-user-module-tests/monthly-task-tests/monthly-task.state";
import { 
    MonthlyTaskSchedulersCleared, MonthlyTaskSchedulerAdded,
    MonthlyTaskSchedulerCreationCancelled, MonthlyTaskSchedulerDeletionCancelled, 
    MonthlyTaskSchedulerDeletionSaved, MonthlyTaskSchedulersLoaded
} from "./monthly-task.actions";

fdescribe('monthlyTasksReducer', () => {

    it('returns an initial state when cleared', () =>{
        const state = monthlyTasksReducer(
            initialMonthlyTasksState, 
            new MonthlyTaskSchedulersCleared());
        expect(state).toEqual(initialMonthlyTasksState);
    });

    it('returns the state with monthly task schedulers entities and indicates that ' 
        + 'the schedulers have been loaded', () => {
        const state = monthlyTasksReducer(initialMonthlyTasksState, 
        new MonthlyTaskSchedulersLoaded({ monthlyTasks: monthlyTaskData }));
        expect(state).toEqual(statePriorToNewMonthlyTaskSubmission.monthlyTasks);
    });


    it('returns the original state with one less monthly task entity and indicates that ' 
       + 'the third monthly task scheduler has been sucessfully deleted', () => {
        const state = monthlyTasksReducer(stateAfterNewMonthlyTaskSubmission.monthlyTasks, 
        new MonthlyTaskSchedulerDeletionSaved({ 
            id: 3, 
            message: stateFollowingNewMonthlyTaskDeletion.monthlyTasks.successMessage 
        }));
        expect(state).toEqual(stateFollowingNewMonthlyTaskDeletion.monthlyTasks);
    });

    it('returns the state after the monthly task entity has been added ' 
    + 'and indicates that the deletion of the third monthly task scheduler failed', 
        () => {
        const state = monthlyTasksReducer(
            stateAfterNewMonthlyTaskSubmission.monthlyTasks, 
        new MonthlyTaskSchedulerDeletionCancelled({ 
            err: {
                error: {
                    Error: "Error! Monthly Task Scheduler Deletion Failed!"
                }
            } 
        }));
        expect(state).toEqual(
            stateFollowingNewMonthlyTaskDeletionFailure.monthlyTasks
        );
    });

    it('returns the state with new monthly task entity and indicates that ' 
        + 'the monthly task has been sucessfully submitted', () => {
        const state = monthlyTasksReducer(
            statePriorToNewMonthlyTaskSubmission.monthlyTasks, 
            new MonthlyTaskSchedulerAdded(
                { monthlyTaskScheduler: monthlyTaskDataAfterPost[2] }
                ));
            expect(state).toEqual(
                    stateAfterNewMonthlyTaskSubmission.monthlyTasks
                );
    });

    it('returns the state with originally loaded monthly ' 
        + 'tasks entity and indicates that '
        + 'submission of a new monthly task scheduler has been unsucessful', 
        () => {
            const state = monthlyTasksReducer(
                statePriorToNewMonthlyTaskSubmission.monthlyTasks, 
                new MonthlyTaskSchedulerCreationCancelled({ 
                    err: {
                        error: {
                            Error: "Error submitting monthly task scheduler!"
                        } 
                    } 
                }   ));
            expect(state).toEqual(
                stateAfterNewMonthlyTaskSubmissionFailure.monthlyTasks
            );
    });

});
