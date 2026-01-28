import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

//import { 
//  ApplyBatchSchedulerModel 
//} from 'src/app/models/apply-batch-schedulers-request.model';
import { ApplyWeeklyTaskSchedulerModel } from 'src/app/models/weekly-task.model';
import { environment } from '../../../../../environments/environment';
import { AuthService } from 'src/app/authentication/auth.service';
import { DeletionResponse } from 'src/app/models/deletion-response';

import { 
  WeeklyTaskAppliedQuarterlyModel,
  WeeklyTaskCreateModel, WeeklyTaskModel 
} from 'src/app/models/weekly-task.model';

@Injectable({
  providedIn: 'root'
})
export class WeeklyTaskService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  applyWeeklySchedulerToQuarterAndYear(
    submissionForm: ApplyWeeklyTaskSchedulerModel
  ): Observable<WeeklyTaskAppliedQuarterlyModel>  {
    let token = this.authService.getAuthToken();
    return this.http.post<WeeklyTaskAppliedQuarterlyModel>(
      `${environment.apiUrl}/api/weekly-task/applied-quarterly/`, submissionForm,
      {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
      });
  }

  deleteWeeklyTaskScheduler(
    id: number
  ): Observable<DeletionResponse> {
    let token = this.authService.getAuthToken();
    return this.http.delete<DeletionResponse>(
      `${environment.apiUrl}/api/weekly-task/scheduler/${id}/`,
        {
          headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
        })
    }


  deleteWeeklyTaskSchedulerAppliedQuarterly(
    id: number
  ): Observable<DeletionResponse> {
    let token = this.authService.getAuthToken();
    return this.http.delete<DeletionResponse>(
      `${environment.apiUrl}/api/weekly-task/applied-quarterly/${id}/`,
        {
          headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
        })
  } 

  fetchWeeklyTaskSchedulers(): Observable<WeeklyTaskModel[]> {
    let token = this.authService.getAuthToken();
    return this.http.get<WeeklyTaskModel[]>(
      `${environment.apiUrl}/api/weekly-task/schedulers/`,
      {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
      });
  }


  fetchWeeklyTaskAppliedQuarterlysByQuarter(
    quarter: string, year: number
  ): Observable<WeeklyTaskAppliedQuarterlyModel[]> {
    let token = this.authService.getAuthToken();
    return this.http.get<WeeklyTaskAppliedQuarterlyModel[]>(
      `${environment.apiUrl}/api/weekly-task/applied-quarterly/${quarter}/${year}/`,
      {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
      });
  }
 

  submitWeeklyTaskScheduler(
    submissionForm: WeeklyTaskCreateModel
    ): Observable<WeeklyTaskModel> {
    let token = this.authService.getAuthToken();
    return this.http.post<WeeklyTaskModel>(
      `${environment.apiUrl}/api/weekly-task/scheduler/`, submissionForm,
      {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
      });
  }
}
