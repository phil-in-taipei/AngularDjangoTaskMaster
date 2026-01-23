import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import { Router } from "@angular/router";
import { Observable } from "rxjs";

import { AppState } from 'src/app/reducers';
import { getDateString } from 'src/app/shared-utils/date-time.util';
import { 
  LandingPageTasksRequested 
} from '../../tasks/single/state/single-task.actions';
import { 
  selectSingleTasksByDate 
} from '../../tasks/single/state/single-task.selectors';
import { selectUserProfile } from '../../user/user-state/user.selectors';
import { 
  SingleTaskConfirmationRequested 
} from '../../tasks/single/state/single-task.actions';
import { SingleTaskModel } from 'src/app/models/single-task.model';
import { UserProfileModel } from 'src/app/models/user-profile.model';


@Component({
  selector: 'app-landing-page-user',
  standalone: false,
  templateUrl: './landing-page-user.component.html',
  styleUrl: './landing-page-user.component.css'
})
export class LandingPageUserComponent implements OnInit{

  dateModel = {year: 0, month: 0, day: 0};
  todaysTasks$: Observable<SingleTaskModel[] | undefined>;
  userProfile$: Observable<UserProfileModel | undefined>;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new LandingPageTasksRequested());
    let dateTimeObj = new Date();
    this.dateModel.year = dateTimeObj.getUTCFullYear();
    this.dateModel.month = dateTimeObj.getUTCMonth() + 1;
    this.dateModel.day = dateTimeObj.getUTCDate();
    let todayDateStr = this.getTodayDateString();
    this.todaysTasks$ = this.store.pipe(
      select(selectSingleTasksByDate(todayDateStr)));
    this.userProfile$ = this.store.pipe(select(selectUserProfile));
  }

  getTodayDateString(): string {
    const dateString = getDateString(
      this.dateModel.day,
      this.dateModel.month,
      this.dateModel.year
    );
    return dateString;
  }

  navToSelectedDate(): void {
    let dateString = getDateString(
      this.dateModel.day,
      this.dateModel.month,
      this.dateModel.year
    );
    this.router.navigate(
      ['/', 'authenticated-user', 'tasks-daily', dateString]
    );
  }

  onConfirmTaskCompletion(id: number) {
    const payload = { id: +id };
    this.store.dispatch(
      new SingleTaskConfirmationRequested(payload)
    );
  }
}
