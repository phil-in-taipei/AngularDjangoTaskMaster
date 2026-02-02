import { 
    initialMonthlyTaskAppliedQuarterlysState, 
    monthlyTaskAppliedQuarterlysReducer 
} from "./monthly-applied-quarterly.reducers";

import { 
    mTAQQuarter2Data, mTAQQuarter2DataAfterPost 
} from "src/app/test-data/authenticated-user-module-tests/monthly-task-tests/monthly-task.data";
import { 
    statePriorToNewMTAQSubmission,
    stateAfterNewMTAQSubmissionFailure, stateAfterNewMTAQSubmission, 
    stateFollowingNewMTAQDeletion, stateFollowingNewMTAQDeletionFailure 
} from "src/app/test-data/authenticated-user-module-tests/monthly-task-tests/monthly-task-applied-quarterly.state";
import { 
    MonthlyTaskAppliedQuarterlysCleared, 
    MonthlyTaskAppliedQuarterlyAdded, 
    MonthlyTaskAppliedQuarterlyCreationCancelled, 
    MonthlyTaskAppliedQuarterlyDeletionCancelled, 
    MonthlyTaskAppliedQuarterlyDeletionSaved, 
    MonthlyTaskAppliedQuarterlysLoaded
} from "./monthly-applied-quarterly.actions";

fdescribe('monthlyTaskAppliedQuarterlysReducer', () => {

    it('returns an initial state when cleared', () =>{
        const state = monthlyTaskAppliedQuarterlysReducer(
            initialMonthlyTaskAppliedQuarterlysState, 
            new MonthlyTaskAppliedQuarterlysCleared());
        expect(state).toEqual(initialMonthlyTaskAppliedQuarterlysState);
    });


    it('returns the state with monthly task applied quarterly entities ' 
        + 'and indicates that the application objects have been loaded', 
            () => {
        const state = monthlyTaskAppliedQuarterlysReducer(
            initialMonthlyTaskAppliedQuarterlysState, 
            new MonthlyTaskAppliedQuarterlysLoaded(
                { monthlyTasks: mTAQQuarter2Data }
            ));
        expect(state).toEqual(
            statePriorToNewMTAQSubmission.monthlyTasksAppliedQuarterly
        );
    });


    it('returns the original state with one less monthly task applied quarterly  ' 
        + 'entity and indicates that the third monthly'
       + ' task scheduler has been sucessfully deleted', 
        () => {
        const state = monthlyTaskAppliedQuarterlysReducer(
            stateAfterNewMTAQSubmission.monthlyTasksAppliedQuarterly, 
        new MonthlyTaskAppliedQuarterlyDeletionSaved({ 
            id: 3, 
            message: stateFollowingNewMTAQDeletion
                        .monthlyTasksAppliedQuarterly.successMessage 
        }));
        expect(state).toEqual(
            stateFollowingNewMTAQDeletion.monthlyTasksAppliedQuarterly
        );
    });

    it('returns the state after the monthly task applied quarterly entity has been added ' 
    + 'and indicates that the deletion of the third monthly task application failed', 
        () => {
        const state = monthlyTaskAppliedQuarterlysReducer(
            stateAfterNewMTAQSubmission.monthlyTasksAppliedQuarterly, 
        new MonthlyTaskAppliedQuarterlyDeletionCancelled({ 
            err: {
                error: {
                    Error: "Error! Monthly Task Applied Quarterly Deletion Failed!"
                }
            } 
        }));
        expect(state).toEqual(
            stateFollowingNewMTAQDeletionFailure
                .monthlyTasksAppliedQuarterly
        );
    });

    it('returns the state with new monthly task applied '
        + 'quarterly entity and indicates that ' 
        + 'the monthly task applied quarterly has been sucessfully submitted', 
            () => {
            const state = monthlyTaskAppliedQuarterlysReducer(
                statePriorToNewMTAQSubmission.monthlyTasksAppliedQuarterly, 
                new MonthlyTaskAppliedQuarterlyAdded(
                    { monthlyTaskAppliedQuarterly: mTAQQuarter2DataAfterPost[2] }
                ));
            expect(state).toEqual(
                stateAfterNewMTAQSubmission
                    .monthlyTasksAppliedQuarterly
                );
    });

    it('returns the state with originally loaded monthly task ' 
        + 'applied quarterlys entity and indicates that submission of a new monthly' 
        + ' task applied quarterly has been unsucessful', () => {
        const state = monthlyTaskAppliedQuarterlysReducer(
            statePriorToNewMTAQSubmission.monthlyTasksAppliedQuarterly, 
        new MonthlyTaskAppliedQuarterlyCreationCancelled({ err: {error: {
            Error: "Error submitting monthly task application!"
        } } }));
       expect(state).toEqual(
        stateAfterNewMTAQSubmissionFailure
            .monthlyTasksAppliedQuarterly
        );
    });

});
