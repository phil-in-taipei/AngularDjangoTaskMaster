import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { 
  ApplyBatchSchedulerModel 
} from 'src/app/models/apply-batch-schedulers-request.model';
import { AuthService } from 'src/app/authentication/auth.service';
import { DeletionResponse } from 'src/app/models/deletion-response';
import { 
  IntervalTaskCreateModel,
  IntervalTaskGroupAppliedQuarterlyModel,
  IntervalTaskGroupCreateModel, 
  IntervalTaskGroupModel 
} from 'src/app/models/interval-task-group.model';

@Injectable({
  providedIn: 'root'
})
export class IntervalTaskGroupService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  applyIntervalTaskGroupToQuarterAndYear(
    submissionForm: ApplyBatchSchedulerModel
  ): Observable<IntervalTaskGroupAppliedQuarterlyModel>  {
    let token = this.authService.getAuthToken();
    return this.http.post<IntervalTaskGroupAppliedQuarterlyModel>(
      `${environment.apiUrl}/api/interval/apply-quarterly`, submissionForm,
      {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
      });
  }

  deleteIntervalTaskGroup(
    id: number
    ): Observable<DeletionResponse> {
    let token = this.authService.getAuthToken();
    return this.http.delete<DeletionResponse>(
    `${environment.apiUrl}/api/interval/delete-group/${id}`,
    {
    headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
    })
  }

  deleteIntervalTaskGroupAppliedQuarterly(
    id: number
  ): Observable<DeletionResponse> {
    let token = this.authService.getAuthToken();
    return this.http.delete<DeletionResponse>(
      `${environment.apiUrl}/api/interval/delete-applied-quarterly/${id}`,
        {
          headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
        })
  }

  // this will remove the task scheduler from the group and return the interval
  // task group object without the scheduler in the array
  deleteIntervalTaskFromGroup(
    intervalTaskId: number, taskGroupId: number
    ): Observable<IntervalTaskGroupModel> {
    let token = this.authService.getAuthToken();
    return this.http.delete<IntervalTaskGroupModel>(
    `${environment.apiUrl}/api/interval/delete-scheduler/${intervalTaskId}/${taskGroupId}`,
    {
    headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
    })
  }
      
  fetchIntervalTaskGroups(): Observable<IntervalTaskGroupModel[]> {
    let token = this.authService.getAuthToken();
    return this.http.get<IntervalTaskGroupModel[]>(
    `${environment.apiUrl}/api/interval/groups`,
    {
    headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
    });
  }

  fetchIntervalTaskGroupAppliedQuarterlysByQuarter(
    quarter: string, year: number
  ): Observable<IntervalTaskGroupAppliedQuarterlyModel[]> {
    let token = this.authService.getAuthToken();
    return this.http.get<IntervalTaskGroupAppliedQuarterlyModel[]>(
      `${environment.apiUrl}/api/interval/applied-quarterly/${quarter}/${year}`,
      {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
      });
  }

  submitIntervalTaskGroup(
    submissionForm: IntervalTaskGroupCreateModel
    ): Observable<IntervalTaskGroupModel> {
    let token = this.authService.getAuthToken();
    return this.http.post<IntervalTaskGroupModel>(
    `${environment.apiUrl}/api/interval/create-group`, submissionForm,
    {
    headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
    });
  }

  // after submitting the new interval task, it will return the whole interval
  // task group object with the newly created member task in the nested array
  submitIntervalTaskScheduler(
    submissionForm: IntervalTaskCreateModel
    ): Observable<IntervalTaskGroupModel> {
    let token = this.authService.getAuthToken();
    return this.http.post<IntervalTaskGroupModel>(
    `${environment.apiUrl}/api/interval/create-scheduler`, submissionForm,
    {
    headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
    });
  }
  
}
