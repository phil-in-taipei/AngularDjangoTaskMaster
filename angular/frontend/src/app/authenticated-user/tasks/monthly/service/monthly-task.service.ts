import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { AuthService } from 'src/app/authentication/auth.service';
import { DeletionResponse } from 'src/app/models/deletion-response';

import { 
  ApplyMonthlyTaskSchedulerModel,
  MonthlyTaskAppliedQuarterlyModel, 
  MonthlyTaskCreateModel, MonthlyTaskModel 
} from 'src/app/models/monthly-task.model';

@Injectable({
  providedIn: 'root'
})
export class MonthlyTaskService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  applyMonthlySchedulerToQuarterAndYear(
    submissionForm: ApplyMonthlyTaskSchedulerModel
  ): Observable<MonthlyTaskAppliedQuarterlyModel>  {
    let token = this.authService.getAuthToken();
    return this.http.post<MonthlyTaskAppliedQuarterlyModel>(
      `${environment.apiUrl}/api/monthly-task/applied-quarterly/`, submissionForm,
      {
        headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
      });
  }
  
  deleteMonthlyTaskScheduler(
    id: number
  ): Observable<DeletionResponse> {
    let token = this.authService.getAuthToken();
    return this.http.delete<DeletionResponse>(
      `${environment.apiUrl}/api/monthly-task/scheduler/${id}/`,
      {
        headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
      })
    }

  deleteMonthlyTaskSchedulerAppliedQuarterly(
    id: number
  ): Observable<DeletionResponse> {
    let token = this.authService.getAuthToken();
    return this.http.delete<DeletionResponse>(
      `${environment.apiUrl}/api/monthly-task/applied-quarterly/${id}/`,
        {
          headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
        })
  }

  fetchMonthyTaskAppliedQuarterlysByQuarter(
    quarter: string, year: number
  ): Observable<MonthlyTaskAppliedQuarterlyModel[]> {
    let token = this.authService.getAuthToken();
    return this.http.get<MonthlyTaskAppliedQuarterlyModel[]>(
      `${environment.apiUrl}/api/monthly-task/applied-quarterly/${quarter}/${year}/`,
      {
        headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
      });
  }
  
  fetchMonthlyTaskSchedulers(): Observable<MonthlyTaskModel[]> {
    let token = this.authService.getAuthToken();
    return this.http.get<MonthlyTaskModel[]>(
      `${environment.apiUrl}/api/monthly-task/schedulers/`,
      {
        headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
      });
  }
  
  submitMonthlyTaskScheduler(
    submissionForm: MonthlyTaskCreateModel
  ): Observable<MonthlyTaskModel> {
    let token = this.authService.getAuthToken();
    return this.http.post<MonthlyTaskModel>(
      `${environment.apiUrl}/api/monthly-task/scheduler/`, submissionForm,
      {
        headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
      });
  }
  
}
