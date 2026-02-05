import {
    initialIntervalTaskGroupAppliedQuarterlysState,
   intervalTaskGroupAppliedQuarterlysReducer
} from "./interval-task-group-applied-quarterly.reducers";
import {
   iTGAQQuarter2Data, iTGAQQuarter2DataAfterPost
} from "src/app/test-data/authenticated-user-module-tests/interval-task-group-tests/interval-task-group.data";
import {
   statePriorToNewITGAQSubmission,
   stateAfterNewITGAQSubmissionFailure, stateAfterNewITGAQSubmission,
   stateFollowingNewITGAQDeletion, stateFollowingNewITGAQDeletionFailure
} from "src/app/test-data/authenticated-user-module-tests/interval-task-group-tests/interval-task-group-applied-quarterly.state";
import {
   IntervalTaskGroupAppliedQuarterlysCleared,
   IntervalTaskGroupAppliedQuarterlyAdded,
   IntervalTaskGroupAppliedQuarterlyCreationCancelled,
   IntervalTaskGroupAppliedQuarterlyDeletionCancelled,
   IntervalTaskGroupAppliedQuarterlyDeletionSaved,
   IntervalTaskGroupAppliedQuarterlysLoaded
} from "./interval-task-group-applied-quarterly.actions";

fdescribe('intervalTaskGroupAppliedQuarterlysReducer', () => {
    
    it('returns an initial state when cleared', () =>{
        const state = intervalTaskGroupAppliedQuarterlysReducer(
        initialIntervalTaskGroupAppliedQuarterlysState,
        new IntervalTaskGroupAppliedQuarterlysCleared());
        expect(state).toEqual(initialIntervalTaskGroupAppliedQuarterlysState);
    });

   it('returns the state with interval task group applied quarterly entities '
    + 'and indicates that the application objects have been loaded',
    () => {
        const state = intervalTaskGroupAppliedQuarterlysReducer(
        initialIntervalTaskGroupAppliedQuarterlysState,
        new IntervalTaskGroupAppliedQuarterlysLoaded(
            { intervalTasks: iTGAQQuarter2Data }
            ));
        expect(state).toEqual(
        statePriorToNewITGAQSubmission.intervalTasksGroupsAppliedQuarterly
            );
    });

   it('returns the original state with one less interval task group applied quarterly '
    + 'entity and indicates that the third interval'
    + ' task scheduler has been sucessfully deleted',
        () => {
        const state = intervalTaskGroupAppliedQuarterlysReducer(
        stateAfterNewITGAQSubmission.intervalTasksGroupsAppliedQuarterly,
        new IntervalTaskGroupAppliedQuarterlyDeletionSaved({
        id: 3,
        message: stateFollowingNewITGAQDeletion
            .intervalTasksGroupsAppliedQuarterly.successMessage
            }));
        expect(state).toEqual(
        stateFollowingNewITGAQDeletion.intervalTasksGroupsAppliedQuarterly
            );
    });

   it('returns the state after the interval task group applied quarterly entity has been added '
    + 'and indicates that the deletion of the third interval task application failed',
        () => {
        const state = intervalTaskGroupAppliedQuarterlysReducer(
            stateAfterNewITGAQSubmission.intervalTasksGroupsAppliedQuarterly,
            new IntervalTaskGroupAppliedQuarterlyDeletionCancelled({
            err: {
                error: 
                    { 
                        Error: "Error! Interval Task Group Applied Quarterly Deletion Failed!" 
                    }
                }
            }));
        expect(state).toEqual(
        stateFollowingNewITGAQDeletionFailure
            .intervalTasksGroupsAppliedQuarterly
        );
    });

   it('returns the state with new interval task group applied '
    + 'quarterly entity and indicates that '
    + 'the interval task group applied quarterly has been sucessfully submitted',
        () => {
        const state = intervalTaskGroupAppliedQuarterlysReducer(
        statePriorToNewITGAQSubmission.intervalTasksGroupsAppliedQuarterly,
        new IntervalTaskGroupAppliedQuarterlyAdded(
            { intervalTaskGroupAppliedQuarterly: iTGAQQuarter2DataAfterPost[2] }
            ));
        expect(state).toEqual(
        stateAfterNewITGAQSubmission
            .intervalTasksGroupsAppliedQuarterly
        );
    });

   it('returns the state with originally loaded interval task '
        + 'group applied quarterlys entity and indicates that submission of a new interval'
        + ' task group applied quarterly has been unsucessful', () => {
        const state = intervalTaskGroupAppliedQuarterlysReducer(
            statePriorToNewITGAQSubmission.intervalTasksGroupsAppliedQuarterly,
            new IntervalTaskGroupAppliedQuarterlyCreationCancelled({ err: {error: {
            Error: "Error submitting interval task group application!"
                } } }));
        expect(state).toEqual(
                stateAfterNewITGAQSubmissionFailure
                    .intervalTasksGroupsAppliedQuarterly
            );
    });
});
