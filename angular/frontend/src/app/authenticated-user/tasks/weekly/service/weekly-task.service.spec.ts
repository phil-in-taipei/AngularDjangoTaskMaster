import { TestBed, fakeAsync  } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule
} from '@angular/common/http/testing';

import { environment } from 'src/environments/environment';
import { 
  authData 
} from 'src/app/test-data/authentication-tests/authentication-data';
import { 
  AuthService 
} from 'src/app/authentication/auth.service';
import { WeeklyTaskService } from './weekly-task.service';
import { 
  testWTAQPostRequest, wTAQDeletionResponse, wTAQQuarter2DataAfterPost,
  weeklyTaskCreateRequest, weeklyTaskDataAfterPost, 
  weeklyTaskDeletionResponse, wTAQQuarter2Data
} from 'src/app/test-data/authenticated-user-module-tests/weekly-task-tests/weekly-task.data';

fdescribe('WeeklyTaskService', () => {
  let service: WeeklyTaskService;
  let httpTestingController: HttpTestingController;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getAuthToken']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        WeeklyTaskService,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });
    service = TestBed.inject(WeeklyTaskService);
    httpTestingController = TestBed.inject(HttpTestingController);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should return a new weekly task scheduler object from backend after submitting ' +
    'data to create a new weekly task',
    fakeAsync(() => {
      authServiceSpy.getAuthToken.and.returnValue(authData.token);

      service.submitWeeklyTaskScheduler(weeklyTaskCreateRequest)
        .subscribe(response => {
          expect(response).toEqual(weeklyTaskDataAfterPost[2]);
        });

      const request = httpTestingController.expectOne({
        method: 'POST',
        url: `${environment.apiUrl}/api/weekly/create`,
      });

      request.flush(weeklyTaskDataAfterPost[2]);

    }));

  it('should return a new weekly task applied quarterly object from backend after submitting '
    + 'data to apply a weekly task to a given year/quarter',
    fakeAsync(() => {
      authServiceSpy.getAuthToken.and.returnValue(authData.token);
  
      service.applyWeeklySchedulerToQuarterAndYear(testWTAQPostRequest)
        .subscribe(response => {
          expect(response).toEqual(wTAQQuarter2DataAfterPost[2]);
      });
  
      const request = httpTestingController.expectOne({
        method: 'POST',
        url: `${environment.apiUrl}/api/weekly/apply-quarterly`,
      });
  
      request.flush(wTAQQuarter2DataAfterPost[2]);
  }));

  // this response is important because the id value in the response will be used
  // to update state by indicating id of the entity to be removed (ngrx/entity)
  it('should return a response message from backend after deletion ' +
    'with a message and the weekly task scheduler id',
    fakeAsync(() => {
      authServiceSpy.getAuthToken.and.returnValue(authData.token);

      service.deleteWeeklyTaskScheduler(3).subscribe(response => {
        expect(response.id).toEqual(3);
        expect(response).toEqual(weeklyTaskDeletionResponse);
      });

      const request = httpTestingController.expectOne({
        method: 'DELETE',
        url: `${environment.apiUrl}/api/weekly/delete/3`,
      });

      request.flush(weeklyTaskDeletionResponse);

  }));

  it('should return a response message from the backend after deletion of a weekly task applied '
    + 'quarterly object with a message and the weekly task scheduler application id',
    fakeAsync(() => {
      authServiceSpy.getAuthToken.and.returnValue(authData.token);

      service.deleteWeeklyTaskSchedulerAppliedQuarterly(3).subscribe(response => {
        expect(response.id).toEqual(3);
        expect(response).toEqual(wTAQDeletionResponse);
      });

      const request = httpTestingController.expectOne({
        method: 'DELETE',
        url: `${environment.apiUrl}/api/weekly/delete-applied-quarterly/3`,
      });

    request.flush(wTAQDeletionResponse);
  }));

  it("should return the array of users' weekly task schedulers from the api",
    fakeAsync(() => {
      authServiceSpy.getAuthToken.and.returnValue(authData.token);
      service.fetchWeeklyTaskSchedulers().subscribe(response => {
        expect(response).toEqual(weeklyTaskDataAfterPost);
      });

      const request = httpTestingController.expectOne({
        method: 'GET',
        url: `${environment.apiUrl}/api/weekly/schedulers`,
      });

      request.flush(weeklyTaskDataAfterPost);

    }));

  it("should return the array of users' weekly tasks applied quarterly from "
    + " the api after requesting for a given quarter/year",
    fakeAsync(() => {
      authServiceSpy.getAuthToken.and.returnValue(authData.token);
      service.fetchWeeklyTaskAppliedQuarterlysByQuarter("Q2", 2024).subscribe(response => {
        expect(response).toEqual(wTAQQuarter2Data);
      });
  
      const request = httpTestingController.expectOne({
        method: 'GET',
        url: `${environment.apiUrl}/api/weekly/applied-quarterly/Q2/2024`,
      });
  
      request.flush(wTAQQuarter2Data);
  }));

  afterEach(() => {
    httpTestingController.verify();
  });
  
});
