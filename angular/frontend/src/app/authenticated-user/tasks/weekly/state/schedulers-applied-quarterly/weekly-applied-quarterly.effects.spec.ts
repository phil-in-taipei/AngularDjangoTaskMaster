import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { from, Observable, of } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { provideMockStore } from '@ngrx/store/testing';
import {
    initialWeeklyTaskAppliedQuarterlysState
} from './weekly-applied-quarterly.reducers';
import {
    testWTAQPostRequest, wTAQQuarter2Data,
    wTAQQuarter2DataAfterPost, wTAQDeletionResponse
} from 'src/app/test-data/authenticated-user-module-tests/weekly-task-tests/weekly-task.data';
import {
    WeeklyTaskAppliedQuarterlysLoaded,
    WeeklyTaskAppliedQuarterlyCreateSubmitted,
    WeeklyTaskAppliedQuarterlysRequested,
    WeeklyTaskAppliedQuarterlyAdded,
    WeeklyTaskAppliedQuarterlyDeletionRequested,
    WeeklyTaskAppliedQuarterlyDeletionSaved
} from './weekly-applied-quarterly.actions';
import { selectWeeklyTaskAppliedQuarterlysLoaded } from './weekly-applied-quarterly.selectors';
import { WeeklyTaskAppliedQuarterlysEffects } from './weekly-applied-quarterly.effects';
import { WeeklyTaskService } from '../../service/weekly-task.service';
import { WeeklyTaskAppliedQuarterlyModel } from 'src/app/models/weekly-task.model';
import { ApplyBatchSchedulerModel } from 'src/app/models/apply-batch-schedulers-request.model';
import { DeletionResponse } from 'src/app/models/deletion-response';

fdescribe('WeeklyTaskAppliedQuarterlysEffects', () => {
    let effects: WeeklyTaskAppliedQuarterlysEffects;
    let weeklyTaskService: WeeklyTaskService;


    beforeEach(() => {
        const mockWeeklyTaskService = {
            fetchWeeklyTaskAppliedQuarterlysByQuarter(
                    quarter: string, year: number): 
                Observable<WeeklyTaskAppliedQuarterlyModel[]>{
                return of(wTAQQuarter2Data);
            },
            deleteWeeklyTaskSchedulerAppliedQuarterly(id: number): 
                Observable<DeletionResponse> {
                   return of(wTAQDeletionResponse)
            },
            applyWeeklySchedulerToQuarterAndYear(
                submissionForm: ApplyBatchSchedulerModel
            ): Observable<WeeklyTaskAppliedQuarterlyModel> {
                return of(wTAQQuarter2DataAfterPost[2]);
            },
        };

        TestBed.configureTestingModule({    
            providers: [
                provideMockStore({
                    initialState: initialWeeklyTaskAppliedQuarterlysState,
                    selectors: [
                        {
                          selector: selectWeeklyTaskAppliedQuarterlysLoaded,
                          value: false
                        }
                      ]
                }),
                provideMockActions(from([
                    new WeeklyTaskAppliedQuarterlysRequested(
                        { quarter: "Q2", year: 2024 }
                    ),
                    new WeeklyTaskAppliedQuarterlyCreateSubmitted(
                        { weeklyTaskAppliedQuarterly: testWTAQPostRequest }
                    ),
                    new WeeklyTaskAppliedQuarterlyAdded(
                        { weeklyTaskAppliedQuarterly: wTAQQuarter2DataAfterPost[2] }
                    ),
                    new WeeklyTaskAppliedQuarterlyDeletionRequested
                    (
                        { id: wTAQDeletionResponse.id }
                    ),
                    new WeeklyTaskAppliedQuarterlyDeletionSaved
                    (
                        {
                            id: wTAQDeletionResponse.id, 
                            message: wTAQDeletionResponse.message
                        }
                    )
                ])),
                WeeklyTaskAppliedQuarterlysEffects,
                { provide: WeeklyTaskService, 
                  useValue: mockWeeklyTaskService }
              ]
        });
        effects = TestBed.inject(WeeklyTaskAppliedQuarterlysEffects);
        weeklyTaskService = TestBed.inject(WeeklyTaskService);

    });

    it('WeeklyTaskAppliedQuarterlyCreateSubmitted should submit new weekly' 
        + ' task applied quarterly data to backend and save the returned newly created object', 
            fakeAsync(() => {
                spyOn(weeklyTaskService, 'applyWeeklySchedulerToQuarterAndYear')
                        .and.returnValue(of(wTAQQuarter2DataAfterPost[2]));
                let actualActions: Action[] | undefined;
                const expectedActions: Action[] = [new WeeklyTaskAppliedQuarterlyAdded(
                    { weeklyTaskAppliedQuarterly: wTAQQuarter2DataAfterPost[2] }
                )];
    
                effects.submitWeeklyTaskAppliedQuarterly$.pipe(toArray()).subscribe({
                    next: (actualActions2) => actualActions = actualActions2,
                    error: fail,
                });
                
                expect(actualActions).toEqual(expectedActions);
                flush();
    }));

    it('WeeklyTaskAppliedQuarterlyDeletionRequested should handle the deletion response with message/id '
        + ' by calling the save method to remove the weekly task applied quarterly object from state',
            fakeAsync(() => {
            spyOn(weeklyTaskService, 'deleteWeeklyTaskSchedulerAppliedQuarterly')
                .and.returnValue(of(wTAQDeletionResponse));
            let actualActions: Action[] | undefined;
            const expectedActions: Action[] = [
                    new WeeklyTaskAppliedQuarterlyDeletionSaved(
                        wTAQDeletionResponse
                    )
                ];
    
            effects.deleteWeeklyTaskAppliedQuarterly$.pipe(toArray()).subscribe({
                next: (actualActions2) => actualActions = actualActions2,
                error: fail,
            });
    
            expect(actualActions).toEqual(expectedActions);
            flush();
    }));
    

    it('WeeklyTaskAppliedQuarterlysRequested should call fetch the weekly task'
        + ' schedulers applied quarterly objects and load them into state',
            fakeAsync(() => {
                spyOn(weeklyTaskService, 'fetchWeeklyTaskAppliedQuarterlysByQuarter')
                    .and.returnValue(of(wTAQQuarter2Data));
                let actualActions: Action[] | undefined;
                const expectedActions: Action[] = [
                    new WeeklyTaskAppliedQuarterlysLoaded(
                        { weeklyTasks: wTAQQuarter2Data }
                    )
                ];
    
                effects.fetchWeeklyTasksAppliedQuarterlys$.pipe(toArray()).subscribe({
                    next: (actualActions2) => actualActions = actualActions2,
                    error: fail,
                });
         
                expect(actualActions).toEqual(expectedActions);
                flush();
    }));    
});