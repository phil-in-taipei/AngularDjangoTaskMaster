import {
    initialWeeklyTaskAppliedQuarterlysState, 
    weeklyTaskAppliedQuarterlysReducer 
} from "./weekly-applied-quarterly.reducers";

import { 
    wTAQQuarter2Data, wTAQQuarter2DataAfterPost 
} from "src/app/test-data/authenticated-user-module-tests/weekly-task-tests/weekly-task.data";
import { 
    statePriorToNewwTAQSubmission,
    stateAfterNewwTAQSubmissionFailure, stateAfterNewwTAQSubmission, 
    stateFollowingNewwTAQDeletion, stateFollowingNewwTAQDeletionFailure 
} from "src/app/test-data/authenticated-user-module-tests/weekly-task-tests/weekly-task-applied-quarterly.state";
import { 
    WeeklyTaskAppliedQuarterlysCleared, 
    WeeklyTaskAppliedQuarterlyAdded, 
    WeeklyTaskAppliedQuarterlyCreationCancelled, 
    WeeklyTaskAppliedQuarterlyDeletionCancelled, 
    WeeklyTaskAppliedQuarterlyDeletionSaved, 
    WeeklyTaskAppliedQuarterlysLoaded
} from "./weekly-applied-quarterly.actions";

fdescribe('weeklyTaskAppliedQuarterlysReducer', () => {

    it('returns an initial state when cleared', () =>{
        const state = weeklyTaskAppliedQuarterlysReducer(
            initialWeeklyTaskAppliedQuarterlysState, 
            new WeeklyTaskAppliedQuarterlysCleared());
        expect(state).toEqual(initialWeeklyTaskAppliedQuarterlysState);
    });


    it('returns the state with weekly task applied quarterly entities ' 
        + 'and indicates that the application objects have been loaded', 
            () => {
        const state = weeklyTaskAppliedQuarterlysReducer(
            initialWeeklyTaskAppliedQuarterlysState, 
            new WeeklyTaskAppliedQuarterlysLoaded(
                { weeklyTasks: wTAQQuarter2Data }
            ));
        expect(state).toEqual(
            statePriorToNewwTAQSubmission.weeklyTasksAppliedQuarterly
        );
    });


    it('returns the original state with one less weekly task applied quarterly  ' 
        + 'entity and indicates that the third weekly'
       + ' task scheduler has been sucessfully deleted', 
        () => {
        const state = weeklyTaskAppliedQuarterlysReducer(
            stateAfterNewwTAQSubmission.weeklyTasksAppliedQuarterly, 
        new WeeklyTaskAppliedQuarterlyDeletionSaved({ 
            id: 3, 
            message: stateFollowingNewwTAQDeletion
                        .weeklyTasksAppliedQuarterly.successMessage 
        }));
        expect(state).toEqual(
            stateFollowingNewwTAQDeletion.weeklyTasksAppliedQuarterly
        );
    });

    it('returns the state after the weekly task applied quarterly entity has been added ' 
    + 'and indicates that the deletion of the third weekly task application failed', 
        () => {
        const state = weeklyTaskAppliedQuarterlysReducer(
            stateAfterNewwTAQSubmission.weeklyTasksAppliedQuarterly, 
        new WeeklyTaskAppliedQuarterlyDeletionCancelled({ 
            err: {
                error: {
                    Error: "Error! Weekly Task Applied Quarterly Deletion Failed!"
                }
            } 
        }));
        expect(state).toEqual(
            stateFollowingNewwTAQDeletionFailure
                .weeklyTasksAppliedQuarterly
        );
    });

    it('returns the state with new weekly task applied '
        + 'quarterly entity and indicates that ' 
        + 'the weekly task applied quarterly has been sucessfully submitted', 
            () => {
            const state = weeklyTaskAppliedQuarterlysReducer(
                statePriorToNewwTAQSubmission.weeklyTasksAppliedQuarterly, 
                new WeeklyTaskAppliedQuarterlyAdded(
                    { weeklyTaskAppliedQuarterly: wTAQQuarter2DataAfterPost[2] }
                ));
            expect(state).toEqual(
                stateAfterNewwTAQSubmission
                    .weeklyTasksAppliedQuarterly
                );
    });

    it('returns the state with originally loaded weekly task ' 
        + 'applied quarterlys entity and indicates that submission of a new weekly' 
        + ' task applied quarterly has been unsucessful', () => {
        const state = weeklyTaskAppliedQuarterlysReducer(
            statePriorToNewwTAQSubmission.weeklyTasksAppliedQuarterly, 
        new WeeklyTaskAppliedQuarterlyCreationCancelled({ err: {error: {
            Error: "Error submitting weekly task application!"
        } } }));
       expect(state).toEqual(
        stateAfterNewwTAQSubmissionFailure
            .weeklyTasksAppliedQuarterly
        );
    });

});
