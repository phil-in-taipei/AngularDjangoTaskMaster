import { TestBed, fakeAsync, flush  } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule
} from '@angular/common/http/testing';

import { environment } from 'src/environments/environment';
import { 
  authData 
} from 'src/app/test-data/authentication-tests/authentication-data';
import { 
  AuthService 
} from 'src/app/authentication/auth.service';

import { 
  singleTaskCreateRequest, singleTaskDeletionResponse,
  singleTaskMarch25thData, singleTask3RescheduleRequest,
  singleTaskMarchData, testSingleTask2PostConfirmation,
  testSingleTask3PostRescheduling
} from 'src/app/test-data/authenticated-user-module-tests/single-task-tests/single-task-data';

import { SingleTaskService } from './single-task.service';

fdescribe('SingleTaskService', () => {
  let service: SingleTaskService;
  let httpTestingController: HttpTestingController;
  let authServiceSpy: jasmine.SpyObj<AuthService>;


  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getAuthToken']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        SingleTaskService,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });
    service = TestBed.inject(SingleTaskService);
    httpTestingController = TestBed.inject(HttpTestingController);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });


  it("should return the array of users' tasks from the api,"
   + " which are scheduled on 3/25/2024", 
    fakeAsync(() => {
      authServiceSpy.getAuthToken.and.returnValue(authData.token);
      service.fetchSingleTasksByDate("03-25-2024").subscribe(response => {
        expect(response).toEqual(singleTaskMarch25thData);
      });

      const request = httpTestingController.expectOne({
        method: 'GET',
        url:`${environment.apiUrl}/api/task/date/03-25-2024`,
      });

      request.flush(singleTaskMarch25thData);

  }));


  it("should return the array of users' tasks from the api, which are scheduled in 3/2024", 
    fakeAsync(() => {
      authServiceSpy.getAuthToken.and.returnValue(authData.token);
      service.fetchSingleTasksByMonth(3,2024).subscribe(response => {
        expect(response).toEqual(singleTaskMarchData);
      });

      const request = httpTestingController.expectOne({
        method: 'GET',
        url:`${environment.apiUrl}/api/task/month-year/3/2024`,
      });

      request.flush(singleTaskMarchData);

  }));

  it('should return a new single task object in an array from backend after submitting ' 
    + 'data to create a new task', 
    fakeAsync(() => {
      authServiceSpy.getAuthToken.and.returnValue(authData.token);

      service.submitSingleTask(singleTaskCreateRequest)
        .subscribe(response => {
          expect(response).toEqual(singleTaskMarch25thData);
      });

      const request = httpTestingController.expectOne({
        method: 'POST',
        url:`${environment.apiUrl}/api/task/create`,
      });

      request.flush(singleTaskMarch25thData);

  }));

  it('should return a revised single task from backend after submitting ' 
    + 'a request to the url endpoint to confirm completion of the single task', 
      fakeAsync(() => {
        authServiceSpy.getAuthToken.and.returnValue(authData.token);

        service.confirmTaskCompletion(2).subscribe(response => {
          expect(response).toEqual(testSingleTask2PostConfirmation);
        });

        const request = httpTestingController.expectOne({
          method: 'GET',
          url:`${environment.apiUrl}/api/task/confirm/2`,
        });

        request.flush(testSingleTask2PostConfirmation);

  }));


  it('should return a revised single task from backend after submitting ' 
    + 'data to reschedule the single task', 
      fakeAsync(() => {
        authServiceSpy.getAuthToken.and.returnValue(authData.token);

        service.rescheduleSingleTask(3, singleTask3RescheduleRequest).subscribe(response => {
          expect(response).toEqual(testSingleTask3PostRescheduling);
        });

        const request = httpTestingController.expectOne({
          method: 'PATCH',
          url:`${environment.apiUrl}/api/task/reschedule/3`,
        });

        request.flush(testSingleTask3PostRescheduling);

  }));

  it('should return a response message from backend after deletion ' 
    + 'with a message and the single task id', 
      fakeAsync(() => {
        authServiceSpy.getAuthToken.and.returnValue(authData.token);

        service.deleteSingleTask(3).subscribe(response => {
          expect(response.id).toEqual(3);
          expect(response).toEqual(singleTaskDeletionResponse);
        });

        const request = httpTestingController.expectOne({
          method: 'DELETE',
          url:`${environment.apiUrl}/api/task/delete/3`,
        });

        request.flush(singleTaskDeletionResponse);

  }));

  afterEach(() => {
    httpTestingController.verify();
  });

});
