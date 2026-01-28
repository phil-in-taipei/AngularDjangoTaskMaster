import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { from, Observable, of } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { provideMockStore } from '@ngrx/store/testing';

import { initialWeeklyTasksState } from './weekly-task.reducers';

import {
    weeklyTaskCreateRequest, weeklyTaskData,
    weeklyTaskDataAfterPost, weeklyTaskDeletionResponse
} from 'src/app/test-data/authenticated-user-module-tests/weekly-task-tests/weekly-task.data';

import {
    WeeklyTaskSchedulersLoaded,
    WeeklyTaskSchedulersRequested,
    WeeklyTaskSchedulerCreateSubmitted,
    WeeklyTaskSchedulerAdded,
    WeeklyTaskSchedulerDeletionRequested,
    WeeklyTaskSchedulerDeletionSaved
} from './weekly-task.actions';

import { selectWeeklyTasksLoaded } from './weekly-task.selectors';
import { WeeklyTasksEffects } from './weekly-task.effects';
import { WeeklyTaskService } from '../../service/weekly-task.service';
import {
    WeeklyTaskCreateModel, WeeklyTaskModel
} from 'src/app/models/weekly-task.model';
import { DeletionResponse } from 'src/app/models/deletion-response';

fdescribe('WeeklyTasksEffects', () => {
    let effects: WeeklyTasksEffects;
    let weeklyTaskService: WeeklyTaskService;

    beforeEach(() => {
        const mockWeeklyTaskService = {
            fetchWeeklyTaskSchedulers(): Observable<WeeklyTaskModel[]> {
                return of(weeklyTaskData);
            },
            deleteWeeklyTaskScheduler(id: number):
                Observable<DeletionResponse> {
                   return of(weeklyTaskDeletionResponse)
            },
            submitWeeklyTaskScheduler(
                submissionForm: WeeklyTaskCreateModel
            ): Observable<WeeklyTaskModel> {
                return of(weeklyTaskDataAfterPost[2]);
            },
        };

        TestBed.configureTestingModule({
            providers: [
                provideMockStore({
                    initialState: initialWeeklyTasksState,
                    selectors: [
                        {
                          selector: selectWeeklyTasksLoaded,
                          value: false
                        }
                      ]
                }),
                provideMockActions(from([
                    new WeeklyTaskSchedulersRequested(),
                    new WeeklyTaskSchedulerCreateSubmitted(
                        { weeklyTask: weeklyTaskCreateRequest}
                    ),
                    new WeeklyTaskSchedulerAdded(
                        { weeklyTaskScheduler: weeklyTaskDataAfterPost[2] }
                    ),
                    new WeeklyTaskSchedulerDeletionRequested
                    (
                        { id: weeklyTaskDeletionResponse.id }
                    ),
                    new WeeklyTaskSchedulerDeletionSaved(
                        {
                            id: weeklyTaskDeletionResponse.id,
                            message: weeklyTaskDeletionResponse.message
                        }
                    )
                ])),
                WeeklyTasksEffects,
                { provide: WeeklyTaskService,
                  useValue: mockWeeklyTaskService }
              ]
        });
        effects = TestBed.inject(WeeklyTasksEffects);
        weeklyTaskService = TestBed.inject(WeeklyTaskService);

    });

    it('WeeklyTaskSchedulerCreateSubmitted should submit new weeky'
    + ' task scheduler data to backend and save the returned newly created object',
        fakeAsync(() => {
            spyOn(weeklyTaskService, 'submitWeeklyTaskScheduler')
                    .and.returnValue(of(weeklyTaskDataAfterPost[2]));
            let actualActions: Action[] | undefined;
            const expectedActions: Action[] = [new WeeklyTaskSchedulerAdded(
                { weeklyTaskScheduler: weeklyTaskDataAfterPost[2] }
            )];
            effects.submitWeeklyTaskScheduler$.pipe(toArray()).subscribe({
                next: (actualActions2) => actualActions = actualActions2,
                error: fail,
            });
            expect(actualActions).toEqual(expectedActions);
            flush();
    }));

    it('WeeklyTaskSchedulerDeletionRequested should handle the deletion response with message/id '
    + ' by calling the save method to remove the weekly task scheduler from state',
        fakeAsync(() => {
        spyOn(weeklyTaskService, 'deleteWeeklyTaskScheduler')
            .and.returnValue(of(weeklyTaskDeletionResponse));
        let actualActions: Action[] | undefined;
        const expectedActions: Action[] = [
                new WeeklyTaskSchedulerDeletionSaved(
                    weeklyTaskDeletionResponse
                )
            ];
        effects.deleteWeeklyTaskScheduler$.pipe(toArray()).subscribe({
            next: (actualActions2) => actualActions = actualActions2,
            error: fail,
        });
        expect(actualActions).toEqual(expectedActions);
        flush();
    }));

    it('WeeklyTaskSchedulersRequested should call fetch the weekly task'
    + ' schedulers and load them into state',
        fakeAsync(() => {
            spyOn(weeklyTaskService, 'fetchWeeklyTaskSchedulers')
                .and.returnValue(of(weeklyTaskData));
            let actualActions: Action[] | undefined;
            const expectedActions: Action[] = [
                new WeeklyTaskSchedulersLoaded(
                    { weeklyTasks: weeklyTaskData }
                )
            ];
            effects.fetchWeeklyTasksSchedulers$.pipe(toArray()).subscribe({
                next: (actualActions2) => actualActions = actualActions2,
                error: fail,
            });
            expect(actualActions).toEqual(expectedActions);
            flush();
    }));

});
