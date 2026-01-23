import { 
    initialSingleTasksState, singleTasksReducer 
} from "./single-task.reducers";
import { 
    singleTaskMarch25thData,
} from "src/app/test-data/authenticated-user-module-tests/single-task-tests/single-task-data";
import { 
    statePriorToNewSingleTaskSubmitted,
    stateAfterNewSingleTaskSubmitted,
    stateAfterNewSingleTaskSubmissionFailure
} from "src/app/test-data/authenticated-user-module-tests/single-task-tests/single-task-state";
import { 
    SingleTasksCleared,
    SingleTaskCreatedWithDailyBatchAdded, 
    SingleTaskCreationCancelled
} from "./single-task.actions";

fdescribe('singleTasksReducer', () => {
    
    it('returns an initial state when cleared', () =>{
        const state = singleTasksReducer(
            initialSingleTasksState, 
            new SingleTasksCleared());
        expect(state).toEqual(initialSingleTasksState);
    });

    it('returns the state with new single tasks entity and indicates that ' 
        + 'the single task has been sucessfully submitted', () => {
        const state = singleTasksReducer(statePriorToNewSingleTaskSubmitted.singleTasks, 
        new SingleTaskCreatedWithDailyBatchAdded(
            { dailyTasks: singleTaskMarch25thData }
            ));
        expect(state).toEqual(
            stateAfterNewSingleTaskSubmitted.singleTasks
            );
    });

    it('returns the state with originally loaded single tasks entity and indicates that ' 
        + 'submission of a new single task has been unsucessful', () => {
        const state = singleTasksReducer(
            statePriorToNewSingleTaskSubmitted.singleTasks, 
        new SingleTaskCreationCancelled({ err: {error: {
            Error: "Error submitting task!"
        } } }));
       expect(state).toEqual(
        stateAfterNewSingleTaskSubmissionFailure.singleTasks
        );
    });


});
