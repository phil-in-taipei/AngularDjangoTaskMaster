import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { from, Observable, of } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { provideMockStore } from '@ngrx/store/testing';
import {
initialIntervalTaskGroupAppliedQuarterlysState
} from './interval-task-group-applied-quarterly.reducers';
import {
    testITGAQPostRequest, iTGAQQuarter2Data, 
    iTGAQQuarter2DataAfterPost, iTGAQDeletionResponse
} from 'src/app/test-data/authenticated-user-module-tests/interval-task-group-tests/interval-task-group.data';

import {
IntervalTaskGroupAppliedQuarterlysLoaded,
IntervalTaskGroupAppliedQuarterlyCreateSubmitted,
IntervalTaskGroupAppliedQuarterlysRequested,
IntervalTaskGroupAppliedQuarterlyAdded,
IntervalTaskGroupAppliedQuarterlyDeletionRequested,
IntervalTaskGroupAppliedQuarterlyDeletionSaved
} from './interval-task-group-applied-quarterly.actions';
import { selectIntervalTaskGroupAppliedQuarterlysLoaded } from './interval-task-group-applied-quarterly.selectors';
import { IntervalTaskGroupAppliedQuarterlysEffects } from './interval-task-group-applied-quarterly.effects';
import { IntervalTaskGroupService } from '../../service/interval-task-group.service';
import { IntervalTaskGroupAppliedQuarterlyModel } from 'src/app/models/interval-task-group.model';
import { ApplyBatchSchedulerModel } from 'src/app/models/apply-batch-schedulers-request.model';
import { DeletionResponse } from 'src/app/models/deletion-response';


fdescribe('IntervalTaskGroupAppliedQuarterlysEffects', () => {

    let effects: IntervalTaskGroupAppliedQuarterlysEffects;
    let intervalTaskGroupService: IntervalTaskGroupService;


    beforeEach(() => {
        const mockIntervalTaskGroupService = {
            fetchIntervalTaskGroupAppliedQuarterlysByQuarter(
                    quarter: string, year: number): 
                Observable<IntervalTaskGroupAppliedQuarterlyModel[]>{
                return of(iTGAQQuarter2Data);
            },
            deleteIntervalTaskGroupAppliedQuarterly(id: number): 
                Observable<DeletionResponse> {
                   return of(iTGAQDeletionResponse)
            },
            applyIntervalTaskGroupToQuarterAndYear(
                submissionForm: ApplyBatchSchedulerModel
            ): Observable<IntervalTaskGroupAppliedQuarterlyModel> {
                return of(iTGAQQuarter2DataAfterPost[2]);
            },
        };

        TestBed.configureTestingModule({    
            providers: [
                provideMockStore({
                    initialState: initialIntervalTaskGroupAppliedQuarterlysState,
                    selectors: [
                        {
                          selector: selectIntervalTaskGroupAppliedQuarterlysLoaded,
                          value: false
                        }
                      ]
                }),
                provideMockActions(from([
                    new IntervalTaskGroupAppliedQuarterlysRequested(
                        { quarter: "Q2", year: 2024 }
                    ),
                    new IntervalTaskGroupAppliedQuarterlyCreateSubmitted(
                        { intervalTaskGroupAppliedQuarterly: testITGAQPostRequest }
                    ),
                    new IntervalTaskGroupAppliedQuarterlyAdded(
                        { intervalTaskGroupAppliedQuarterly: iTGAQQuarter2DataAfterPost[2] }
                    ),
                    new IntervalTaskGroupAppliedQuarterlyDeletionRequested
                    (
                        { id: iTGAQDeletionResponse.id }
                    ),
                    new IntervalTaskGroupAppliedQuarterlyDeletionSaved
                    (
                        {
                            id: iTGAQDeletionResponse.id, 
                            message: iTGAQDeletionResponse.message
                        }
                    )
                ])),
                IntervalTaskGroupAppliedQuarterlysEffects,
                { provide: IntervalTaskGroupService, 
                  useValue: mockIntervalTaskGroupService }
              ]
        });
        effects = TestBed.inject(IntervalTaskGroupAppliedQuarterlysEffects);
        intervalTaskGroupService = TestBed.inject(IntervalTaskGroupService);

    });

    it('IntervalTaskGroupAppliedQuarterlyCreateSubmitted should submit new interval' 
        + ' task group applied quarterly data to backend and save the returned newly created object', 
            fakeAsync(() => {
                spyOn(intervalTaskGroupService, 'applyIntervalTaskGroupToQuarterAndYear')
                        .and.returnValue(of(iTGAQQuarter2DataAfterPost[2]));
                let actualActions: Action[] | undefined;
                const expectedActions: Action[] = [new IntervalTaskGroupAppliedQuarterlyAdded(
                    { intervalTaskGroupAppliedQuarterly: iTGAQQuarter2DataAfterPost[2] }
                )];
    
                effects.submitIntervalTaskGroupAppliedQuarterly$.pipe(toArray()).subscribe({
                    next: (actualActions2) => actualActions = actualActions2,
                    error: fail,
                });
                
                expect(actualActions).toEqual(expectedActions);
                flush();
    }));

    it('IntervalTaskGroupAppliedQuarterlyDeletionRequested should handle the deletion response with message/id '
        + ' by calling the save method to remove the interval task group applied quarterly object from state',
            fakeAsync(() => {
            spyOn(intervalTaskGroupService, 'deleteIntervalTaskGroupAppliedQuarterly')
                .and.returnValue(of(iTGAQDeletionResponse));
            let actualActions: Action[] | undefined;
            const expectedActions: Action[] = [
                    new IntervalTaskGroupAppliedQuarterlyDeletionSaved(
                        iTGAQDeletionResponse
                    )
                ];
    
            effects.deleteIntervalTaskGroupAppliedQuarterly$.pipe(toArray()).subscribe({
                next: (actualActions2) => actualActions = actualActions2,
                error: fail,
            });
    
            expect(actualActions).toEqual(expectedActions);
            flush();
    }));
    

    it('IntervalTaskGroupAppliedQuarterlysRequested should call fetch the interval task'
        + ' group schedulers applied quarterly objects and load them into state',
            fakeAsync(() => {
                spyOn(intervalTaskGroupService, 'fetchIntervalTaskGroupAppliedQuarterlysByQuarter')
                    .and.returnValue(of(iTGAQQuarter2Data));
                let actualActions: Action[] | undefined;
                const expectedActions: Action[] = [
                    new IntervalTaskGroupAppliedQuarterlysLoaded(
                        { intervalTasks: iTGAQQuarter2Data }
                    )
                ];
    
                effects.fetchIntervalTasksAppliedQuarterlys$.pipe(toArray()).subscribe({
                    next: (actualActions2) => actualActions = actualActions2,
                    error: fail,
                });
         
                expect(actualActions).toEqual(expectedActions);
                flush();
    }));    
});