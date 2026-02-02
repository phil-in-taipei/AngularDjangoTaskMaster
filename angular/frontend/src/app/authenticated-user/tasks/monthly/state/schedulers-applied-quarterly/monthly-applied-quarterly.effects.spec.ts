import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { from, Observable, of } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { provideMockStore } from '@ngrx/store/testing';

import { 
    initialMonthlyTaskAppliedQuarterlysState 
} from './monthly-applied-quarterly.reducers';

import { 
    testMTAQPostRequest, mTAQQuarter2Data, 
    mTAQQuarter2DataAfterPost, mTAQDeletionResponse 
} from 'src/app/test-data/authenticated-user-module-tests/monthly-task-tests/monthly-task.data';

import { 
    MonthlyTaskAppliedQuarterlysLoaded,
    MonthlyTaskAppliedQuarterlyCreateSubmitted,
    MonthlyTaskAppliedQuarterlysRequested,
    MonthlyTaskAppliedQuarterlyAdded,
    MonthlyTaskAppliedQuarterlyDeletionRequested,
    MonthlyTaskAppliedQuarterlyDeletionSaved
} from './monthly-applied-quarterly.actions';

import { selectMonthlyTaskAppliedQuarterlysLoaded } from './monthly-applied-quarterly.selectors';
import { MonthlyTaskAppliedQuarterlysEffects } from './monthly-applied-quarterly.effects';
import { MonthlyTaskService } from '../../service/monthly-task.service';
import { MonthlyTaskAppliedQuarterlyModel } from 'src/app/models/monthly-task.model';
import { ApplyBatchSchedulerModel } from 'src/app/models/apply-batch-schedulers-request.model';
import { DeletionResponse } from 'src/app/models/deletion-response';

fdescribe('MonthlyTaskAppliedQuarterlysEffects', () => {
    let effects: MonthlyTaskAppliedQuarterlysEffects;
    let monthlyTaskService: MonthlyTaskService;


    beforeEach(() => {
        const mockMonthlyTaskService = {
            fetchMonthyTaskAppliedQuarterlysByQuarter(
                    quarter: string, year: number): 
                Observable<MonthlyTaskAppliedQuarterlyModel[]>{
                return of(mTAQQuarter2Data);
            },
            deleteMonthlyTaskSchedulerAppliedQuarterly(id: number): 
                Observable<DeletionResponse> {
                   return of(mTAQDeletionResponse)
            },
            applyMonthlySchedulerToQuarterAndYear(
                submissionForm: ApplyBatchSchedulerModel
            ): Observable<MonthlyTaskAppliedQuarterlyModel> {
                return of(mTAQQuarter2DataAfterPost[2]);
            },
        };

        TestBed.configureTestingModule({    
            providers: [
                provideMockStore({
                    initialState: initialMonthlyTaskAppliedQuarterlysState,
                    selectors: [
                        {
                          selector: selectMonthlyTaskAppliedQuarterlysLoaded,
                          value: false
                        }
                      ]
                }),
                provideMockActions(from([
                    new MonthlyTaskAppliedQuarterlysRequested(
                        { quarter: "Q2", year: 2024 }
                    ),
                    new MonthlyTaskAppliedQuarterlyCreateSubmitted(
                        { monthlyTaskAppliedQuarterly: testMTAQPostRequest }
                    ),
                    new MonthlyTaskAppliedQuarterlyAdded(
                        { monthlyTaskAppliedQuarterly: mTAQQuarter2DataAfterPost[2] }
                    ),
                    new MonthlyTaskAppliedQuarterlyDeletionRequested
                    (
                        { id: mTAQDeletionResponse.id }
                    ),
                    new MonthlyTaskAppliedQuarterlyDeletionSaved
                    (
                        {
                            id: mTAQDeletionResponse.id, 
                            message: mTAQDeletionResponse.message
                        }
                    )
                ])),
                MonthlyTaskAppliedQuarterlysEffects,
                { provide: MonthlyTaskService, 
                  useValue: mockMonthlyTaskService }
              ]
        });
        effects = TestBed.inject(MonthlyTaskAppliedQuarterlysEffects);
        monthlyTaskService = TestBed.inject(MonthlyTaskService);

    });

    it('MonthlyTaskAppliedQuarterlyCreateSubmitted should submit new monthy' 
        + ' task applied quarterly data to backend and save the returned newly created object', 
            fakeAsync(() => {
                spyOn(monthlyTaskService, 'applyMonthlySchedulerToQuarterAndYear')
                        .and.returnValue(of(mTAQQuarter2DataAfterPost[2]));
                let actualActions: Action[] | undefined;
                const expectedActions: Action[] = [new MonthlyTaskAppliedQuarterlyAdded(
                    { monthlyTaskAppliedQuarterly: mTAQQuarter2DataAfterPost[2] }
                )];
    
                effects.submitMonthlyTaskAppliedQuarterly$.pipe(toArray()).subscribe({
                    next: (actualActions2) => actualActions = actualActions2,
                    error: fail,
                });
                
                expect(actualActions).toEqual(expectedActions);
                flush();
    }));

    it('MonthlyTaskAppliedQuarterlyDeletionRequested should handle the deletion response with message/id '
        + ' by calling the save method to remove the monthly task applied quarterly object from state',
            fakeAsync(() => {
            spyOn(monthlyTaskService, 'deleteMonthlyTaskSchedulerAppliedQuarterly')
                .and.returnValue(of(mTAQDeletionResponse));
            let actualActions: Action[] | undefined;
            const expectedActions: Action[] = [
                    new MonthlyTaskAppliedQuarterlyDeletionSaved(
                        mTAQDeletionResponse
                    )
                ];
    
            effects.deleteMonthlyTaskAppliedQuarterly$.pipe(toArray()).subscribe({
                next: (actualActions2) => actualActions = actualActions2,
                error: fail,
            });
    
            expect(actualActions).toEqual(expectedActions);
            flush();
    }));
    

    it('MonthlyTaskAppliedQuarterlysRequested should call fetch the monthly task'
        + ' schedulers applied quarterly objects and load them into state',
            fakeAsync(() => {
                spyOn(monthlyTaskService, 'fetchMonthyTaskAppliedQuarterlysByQuarter')
                    .and.returnValue(of(mTAQQuarter2Data));
                let actualActions: Action[] | undefined;
                const expectedActions: Action[] = [
                    new MonthlyTaskAppliedQuarterlysLoaded(
                        { monthlyTasks: mTAQQuarter2Data }
                    )
                ];
    
                effects.fetchMonthlyTasksAppliedQuarterlys$.pipe(toArray()).subscribe({
                    next: (actualActions2) => actualActions = actualActions2,
                    error: fail,
                });
         
                expect(actualActions).toEqual(expectedActions);
                flush();
    }));    
});
