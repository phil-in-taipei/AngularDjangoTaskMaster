import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { from, Observable, of } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { provideMockStore } from '@ngrx/store/testing';

import { initialMonthlyTasksState } from './monthly-task.reducers';

import { 
    monthlyTaskCreateRequest, monthlyTaskData, 
    monthlyTaskDataAfterPost, monthlyTaskDeletionResponse
} from 'src/app/test-data/authenticated-user-module-tests/monthly-task-tests/monthly-task.data';

import { 
    MonthlyTaskSchedulersLoaded,
    MonthlyTaskSchedulersRequested,
    MonthlyTaskSchedulerCreateSubmitted,
    MonthlyTaskSchedulerAdded,
    MonthlyTaskSchedulerDeletionRequested,
    MonthlyTaskSchedulerDeletionSaved
} from './monthly-task.actions';

import { selectMonthlyTasksLoaded } from './monthly-task.selectors';
import { MonthlyTasksEffects } from './monthly-task.effects';
import { MonthlyTaskService } from '../../service/monthly-task.service';
import { 
    MonthlyTaskCreateModel, MonthlyTaskModel 
} from 'src/app/models/monthly-task.model';
import { DeletionResponse } from 'src/app/models/deletion-response';

fdescribe('MonthlyTaskEffects', () => {
    let effects: MonthlyTasksEffects;
    let monthlyTaskService: MonthlyTaskService;

    beforeEach(() => {
        const mockMonthlyTaskService = {
            fetchMonthlyTaskSchedulers(): Observable<MonthlyTaskModel[]> {
                return of(monthlyTaskData);
            },
            deleteMonthlyTaskScheduler(id: number): 
                Observable<DeletionResponse> {
                   return of(monthlyTaskDeletionResponse)
            },
            submitMonthlyTaskScheduler(
                submissionForm: MonthlyTaskCreateModel
            ): Observable<MonthlyTaskModel> {
                return of(monthlyTaskDataAfterPost[2]);
            },
        };

        TestBed.configureTestingModule({    
            providers: [
                provideMockStore({
                    initialState: initialMonthlyTasksState,
                    selectors: [
                        {
                          selector: selectMonthlyTasksLoaded,
                          value: false
                        }
                      ]
                }),
                provideMockActions(from([
                    new MonthlyTaskSchedulersRequested(),
                    new MonthlyTaskSchedulerCreateSubmitted(
                        { monthlyTask: monthlyTaskCreateRequest}
                    ),
                    new MonthlyTaskSchedulerAdded(
                        { monthlyTaskScheduler: monthlyTaskDataAfterPost[2] }
                    ),
                    new MonthlyTaskSchedulerDeletionRequested
                    (
                        { id: monthlyTaskDeletionResponse.id }
                    ),
                    new MonthlyTaskSchedulerDeletionSaved(
                        {
                            id: monthlyTaskDeletionResponse.id, 
                            message: monthlyTaskDeletionResponse.message
                        }
                    )
                ])),
                MonthlyTasksEffects,
                { provide: MonthlyTaskService, 
                  useValue: mockMonthlyTaskService }
              ]
        });
        effects = TestBed.inject(MonthlyTasksEffects);
        monthlyTaskService = TestBed.inject(MonthlyTaskService);

    });


    it('MonthlyTaskSchedulerCreateSubmitted should submit new monthy' 
    + ' task scheduler data to backend and save the returned newly created object', 
        fakeAsync(() => {
            spyOn(monthlyTaskService, 'submitMonthlyTaskScheduler')
                    .and.returnValue(of(monthlyTaskDataAfterPost[2]));
            let actualActions: Action[] | undefined;
            const expectedActions: Action[] = [new MonthlyTaskSchedulerAdded(
                { monthlyTaskScheduler: monthlyTaskDataAfterPost[2] }
            )];

            effects.submitMonthlyTaskScheduler$.pipe(toArray()).subscribe({
                next: (actualActions2) => actualActions = actualActions2,
                error: fail,
            });
            
            expect(actualActions).toEqual(expectedActions);
            flush();
    }));


    it('MonthlyTaskSchedulerDeletionRequested should handle the deletion response with message/id '
    + ' by calling the save method to remove the monthly task scheduler from state',
        fakeAsync(() => {
        spyOn(monthlyTaskService, 'deleteMonthlyTaskScheduler')
            .and.returnValue(of(monthlyTaskDeletionResponse));
        let actualActions: Action[] | undefined;
        const expectedActions: Action[] = [
                new MonthlyTaskSchedulerDeletionSaved(
                    monthlyTaskDeletionResponse
                )
            ];

        effects.deleteMonthlyTaskScheduler$.pipe(toArray()).subscribe({
            next: (actualActions2) => actualActions = actualActions2,
            error: fail,
        });

        expect(actualActions).toEqual(expectedActions);
        flush();
    }));

    it('MonthlyTaskSchedulersRequested should call fetch the monhtly task'
    + ' schedulers and load them into state',
        fakeAsync(() => {
            spyOn(monthlyTaskService, 'fetchMonthlyTaskSchedulers')
                .and.returnValue(of(monthlyTaskData));
            let actualActions: Action[] | undefined;
            const expectedActions: Action[] = [
                new MonthlyTaskSchedulersLoaded(
                    { monthlyTasks: monthlyTaskData }
                )
            ];

            effects.fetchMonthlyTasksSchedulers$.pipe(toArray()).subscribe({
                next: (actualActions2) => actualActions = actualActions2,
                error: fail,
            });
     
            expect(actualActions).toEqual(expectedActions);
            flush();
    }));

});
