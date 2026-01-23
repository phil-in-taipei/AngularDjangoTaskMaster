import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { AuthService } from 'src/app/authentication/auth.service';
import { DeletionResponse } from 'src/app/models/deletion-response';
import { getDateString } from 'src/app/shared-utils/date-time.util';
import { 
  SingleTaskCreateModel, 
  SingleTaskRescheduleModel, 
  SingleTaskModel 
} from 'src/app/models/single-task.model';

@Injectable({
  providedIn: 'root'
})
export class SingleTaskService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  confirmTaskCompletion(id: number): Observable<SingleTaskModel> {
    let token = this.authService.getAuthToken();
    return this.http.get<SingleTaskModel>(
      `${environment.apiUrl}/api/single-task/confirm/${id}/`,
        {
          headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
        })
    }

  deleteSingleTask(
    id: number
  ): Observable<DeletionResponse> {
    let token = this.authService.getAuthToken();
    return this.http.delete<DeletionResponse>(
      `${environment.apiUrl}/api/single-task/delete/${id}/`,
        {
          headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
        })
    }

  fetchSingleTasksByDate(
    date: string
  ): Observable<SingleTaskModel[]> {
    let token = this.authService.getAuthToken();
    return this.http.get<SingleTaskModel[]>(
      `${environment.apiUrl}/api/single-task/date/${date}/`,
        {
          headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
        })
  }

  fetchSingleTasksByMonth(
    month: number, year: number
  ): Observable<SingleTaskModel[]> {
    let token = this.authService.getAuthToken();
    return this.http.get<SingleTaskModel[]>(
      `${environment.apiUrl}/api/single-task/month-year/${month}/${year}/`,
        {
          headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
        })
  }

  fetchTodaysSingleTasks(): Observable<SingleTaskModel[]> {
    let dateTimeObj = new Date();
    const date = getDateString(
      dateTimeObj.getUTCDate(),
      dateTimeObj.getUTCMonth() + 1,
      dateTimeObj.getUTCFullYear()
    );
    return this.fetchSingleTasksByDate(date);
  }

  // todo unit test
  fetchUncompletedSingleTasks(): Observable<SingleTaskModel[]> {
    let token = this.authService.getAuthToken();
    return this.http.get<SingleTaskModel[]>(
      `${environment.apiUrl}/api/single-task/unconfirmed/`,
        {
          headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
        })
  }

  rescheduleSingleTask(id: number,
    submissionForm: SingleTaskRescheduleModel
    ): Observable<SingleTaskModel> {
    let token = this.authService.getAuthToken();
    return this.http.patch<SingleTaskModel>(
      `${environment.apiUrl}/api/single-task/reschedule/${id}/`, submissionForm,
      {
        headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
      });
  }

  submitSingleTask(
    submissionForm: SingleTaskCreateModel
    ): Observable<SingleTaskModel[]> {
    let token = this.authService.getAuthToken();
    return this.http.post<SingleTaskModel[]>(
      `${environment.apiUrl}/api/single-task/create/`, submissionForm,
      {
        headers: new HttpHeaders({ 'Authorization': `Token ${token}` })
      });
  }
}