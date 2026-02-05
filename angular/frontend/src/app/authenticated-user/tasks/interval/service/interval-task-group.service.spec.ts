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

import { IntervalTaskGroupService } from './interval-task-group.service';
import { 
  intervalTaskCreateRequest, 
  intervalTaskGroupCreateRequest,
  testIntervalTaskGroup1,
  intervalTaskGroupDataAfterGroupAdded,
  intervalTaskGroupDeletionResponse,
  testIntervalTaskGroup1WithTask,
  iTGAQQuarter2DataAfterPost,
  iTGAQDeletionResponse,
  testITGAQPostRequest,
  iTGAQQuarter2Data
} from 'src/app/test-data/authenticated-user-module-tests/interval-task-group-tests/interval-task-group.data';

fdescribe('IntervalTaskGroupService', () => {
  let service: IntervalTaskGroupService;
  let httpTestingController: HttpTestingController;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getAuthToken']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        IntervalTaskGroupService,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });
    service = TestBed.inject(IntervalTaskGroupService);
    httpTestingController = TestBed.inject(HttpTestingController);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });


  it('should return a new interval task group object from backend after submitting ' 
    + 'data to create a new interval task group', 
    fakeAsync(() => {
      authServiceSpy.getAuthToken.and.returnValue(authData.token);

      service.submitIntervalTaskGroup(intervalTaskGroupCreateRequest)
        .subscribe(response => {
          expect(response).toEqual(testIntervalTaskGroup1);
      });

      const request = httpTestingController.expectOne({
        method: 'POST',
        url:`${environment.apiUrl}/api/interval/create-group`,
      });

      request.flush(testIntervalTaskGroup1);

  }));

  it('should return a new interval task group applied quarterly object from backend after submitting '
    + 'data to apply an interval task group to a given year/quarter',
    fakeAsync(() => {
      authServiceSpy.getAuthToken.and.returnValue(authData.token);
  
      service.applyIntervalTaskGroupToQuarterAndYear(testITGAQPostRequest)
        .subscribe(response => {
          expect(response).toEqual(iTGAQQuarter2DataAfterPost[2]);
      });
  
      const request = httpTestingController.expectOne({
        method: 'POST',
        url: `${environment.apiUrl}/api/interval/apply-quarterly`,
      });
  
      request.flush(iTGAQQuarter2DataAfterPost[2]);
  }));

  it('should return a revised interval task group object from backend after submitting ' 
    + 'data to add a new interval task to the group', 
    fakeAsync(() => {
      authServiceSpy.getAuthToken.and.returnValue(authData.token);

      service.submitIntervalTaskScheduler(intervalTaskCreateRequest)
        .subscribe(response => {
          expect(response).toEqual(testIntervalTaskGroup1WithTask);
      });

      const request = httpTestingController.expectOne({
        method: 'POST',
        url:`${environment.apiUrl}/api/interval/create-scheduler`,
      });

      request.flush(testIntervalTaskGroup1WithTask);

  }));

  it('should return an interval task group object after deletion of interval ' 
    + 'task group member task with the task removed from the group', 
      fakeAsync(() => {
         authServiceSpy.getAuthToken.and.returnValue(authData.token);

        service.deleteIntervalTaskFromGroup(1, 1).subscribe(response => {
          expect(response).toEqual(testIntervalTaskGroup1);
        });

        const request = httpTestingController.expectOne({
          method: 'DELETE',
          url:`${environment.apiUrl}/api/interval/delete-scheduler/1/1`,
        });

        request.flush(testIntervalTaskGroup1);

  }));

  // this response is important because the id value in the response will be used
  // to update state by indicating id of the entity to be removed (ngrx/entity)
  it('should return a response message from backend after deletion of interval ' 
    + 'task group with a message and the interval task group id', 
      fakeAsync(() => {
         authServiceSpy.getAuthToken.and.returnValue(authData.token);

        service.deleteIntervalTaskGroup(3).subscribe(response => {
          expect(response.id).toEqual(3);
          expect(response).toEqual(intervalTaskGroupDeletionResponse);
        });

        const request = httpTestingController.expectOne({
          method: 'DELETE',
          url:`${environment.apiUrl}/api/interval/delete-group/3`,
        });

        request.flush(intervalTaskGroupDeletionResponse);

  }));


  it('should return a response message from the backend after deletion of a interval task group '
    + 'applied quarterly object with a message and the interval task group application id',
    fakeAsync(() => {
      authServiceSpy.getAuthToken.and.returnValue(authData.token);

      service.deleteIntervalTaskGroupAppliedQuarterly(3)
        .subscribe(response => {
          expect(response.id).toEqual(3);
          expect(response).toEqual(iTGAQDeletionResponse);
      });

      const request = httpTestingController.expectOne({
        method: 'DELETE',
        url: `${environment.apiUrl}/api/interval/delete-applied-quarterly/3`,
      });

    request.flush(iTGAQDeletionResponse);
  }));


  it("should return the array of users' interval task groups from the api", 
    fakeAsync(() => {
      authServiceSpy.getAuthToken.and.returnValue(authData.token);
      service.fetchIntervalTaskGroups().subscribe(response => {
        expect(response).toEqual(intervalTaskGroupDataAfterGroupAdded);
      });

      const request = httpTestingController.expectOne({
        method: 'GET',
        url:`${environment.apiUrl}/api/interval/groups`,
      });

      request.flush(intervalTaskGroupDataAfterGroupAdded);

  }));


  it("should return the array of users' interval task groups applied quarterly from "
    + " the api after requesting for a given quarter/year",
    fakeAsync(() => {
      authServiceSpy.getAuthToken.and.returnValue(authData.token);
      service.fetchIntervalTaskGroupAppliedQuarterlysByQuarter("Q2", 2024)
        .subscribe(response => {
          expect(response).toEqual(iTGAQQuarter2Data);
      });
  
      const request = httpTestingController.expectOne({
        method: 'GET',
        url: `${environment.apiUrl}/api/interval/applied-quarterly/Q2/2024`,
      });
  
      request.flush(iTGAQQuarter2Data);
  }));


  afterEach(() => {
    httpTestingController.verify();
  });

});
