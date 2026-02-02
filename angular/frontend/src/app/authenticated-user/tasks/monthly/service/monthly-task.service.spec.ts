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

import { MonthlyTaskService } from './monthly-task.service';
import { 
  monthlyTaskCreateRequest, monthlyTaskDataAfterPost,
  monthlyTaskDeletionResponse, mTAQQuarter2Data, mTAQQuarter2DataAfterPost, 
  mTAQDeletionResponse, testMTAQPostRequest
} from 'src/app/test-data/authenticated-user-module-tests/monthly-task-tests/monthly-task.data';

fdescribe('MonthlyTaskService', () => {
  let service: MonthlyTaskService;
  let httpTestingController: HttpTestingController;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getAuthToken']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        MonthlyTaskService,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });
    service = TestBed.inject(MonthlyTaskService);
    httpTestingController = TestBed.inject(HttpTestingController);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });


  it('should return a new monthly task scheduler object from backend after submitting ' 
    + 'data to create a new monthly task', 
    fakeAsync(() => {
      authServiceSpy.getAuthToken.and.returnValue(authData.token);

      service.submitMonthlyTaskScheduler(monthlyTaskCreateRequest)
        .subscribe(response => {
          expect(response).toEqual(monthlyTaskDataAfterPost[2]);
      });

      const request = httpTestingController.expectOne({
        method: 'POST',
        url:`${environment.apiUrl}/api/monthly/create`,
      });

      request.flush(monthlyTaskDataAfterPost[2]);

  }));


  it('should return a new monthly task applied quarterly object from backend after submitting ' 
    + 'data to apply a monthly task to a given year/quarter', 
    fakeAsync(() => {
      authServiceSpy.getAuthToken.and.returnValue(authData.token);

      service.applyMonthlySchedulerToQuarterAndYear(testMTAQPostRequest)
        .subscribe(response => {
          expect(response).toEqual(mTAQQuarter2DataAfterPost[2]);
      });

      const request = httpTestingController.expectOne({
        method: 'POST',
        url:`${environment.apiUrl}/api/monthly/apply-quarterly`,
      });

      request.flush(mTAQQuarter2DataAfterPost[2]);

  }));

  // this response is important because the id value in the response will be used
  // to update state by indicating id of the entity to be removed (ngrx/entity)
  it('should return a response message from backend after deletion ' 
      + 'of a monthly task scheduler with a message and the monthly task scheduler id', 
    fakeAsync(() => {
      authServiceSpy.getAuthToken.and.returnValue(authData.token);

      service.deleteMonthlyTaskScheduler(3).subscribe(response => {
        expect(response.id).toEqual(3);
        expect(response).toEqual(monthlyTaskDeletionResponse);
      });

      const request = httpTestingController.expectOne({
        method: 'DELETE',
        url:`${environment.apiUrl}/api/monthly/delete/3`,
      });

      request.flush(monthlyTaskDeletionResponse);

  }));


  // this response is important because the id value in the response will be used
  // to update state by indicating id of the entity to be removed (ngrx/entity)
  it('should return a response message from backend after deletion of a monthly task applied ' 
      + 'quarterly object with a message and the monthly task scheduler application id', 
    fakeAsync(() => {
      authServiceSpy.getAuthToken.and.returnValue(authData.token);

      service.deleteMonthlyTaskSchedulerAppliedQuarterly(3).subscribe(response => {
        expect(response.id).toEqual(3);
        expect(response).toEqual(mTAQDeletionResponse);
      });

      const request = httpTestingController.expectOne({
        method: 'DELETE',
        url:`${environment.apiUrl}/api/monthly/delete-applied-quarterly/3`,
      });

      request.flush(mTAQDeletionResponse);

  }));



  it("should return the array of users' monthly task schedulers from the api", 
    fakeAsync(() => {
      authServiceSpy.getAuthToken.and.returnValue(authData.token);
      service.fetchMonthlyTaskSchedulers().subscribe(response => {
        expect(response).toEqual(monthlyTaskDataAfterPost);
      });

      const request = httpTestingController.expectOne({
        method: 'GET',
        url:`${environment.apiUrl}/api/monthly/schedulers`,
      });

      request.flush(monthlyTaskDataAfterPost);

  }));


  it("should return the array of users' monthly tasks applied quarterly from  " 
  + "the api after requesting for a given quarter/year", 
    fakeAsync(() => {
      authServiceSpy.getAuthToken.and.returnValue(authData.token);
      service.fetchMonthyTaskAppliedQuarterlysByQuarter("Q2", 2024).subscribe(response => {
        expect(response).toEqual(mTAQQuarter2Data);
      });

      const request = httpTestingController.expectOne({
        method: 'GET',
        url:`${environment.apiUrl}/api/monthly/applied-quarterly/Q2/2024`,
      });

      request.flush(mTAQQuarter2Data);

  }));


  afterEach(() => {
    httpTestingController.verify();
  });
  
});
