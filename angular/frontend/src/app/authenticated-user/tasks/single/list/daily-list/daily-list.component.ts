import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { AppState } from 'src/app/reducers';
import { SingleTaskModel } from 'src/app/models/single-task.model';
import { 
  DailyTasksRequested, SingleTaskConfirmationRequested
} from '../../state/single-task.actions';
import { getDateString } from 'src/app/shared-utils/date-time.util';
import { 
  selectSingleTasksByDate, selectFetchingTasksInProgress 
} from '../../state/single-task.selectors';

@Component({
  selector: 'app-daily-list',
  standalone: false,
  templateUrl: './daily-list.component.html',
  styleUrl: './daily-list.component.css'
})
export class DailyListComponent implements OnInit{

  dateFromRouteData: string;
  dailyTasks$: Observable<SingleTaskModel[] | undefined>;
  tasksLoaded$: Observable<boolean> = of(false);
  tmrwRouterStr: string;
  ystrdyRouterStr: string;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.dateFromRouteData = this.route.snapshot.params['date'];
    this.tmrwRouterStr = this.getTmrwRouterStr(this.dateFromRouteData);
    this.ystrdyRouterStr = this.getYstrdyRouterStr(this.dateFromRouteData);
    this.tasksLoaded$ = this.store.pipe(
      select(selectFetchingTasksInProgress)
    );

    this.dailyTasks$ = this.store.pipe(
      select(selectSingleTasksByDate(this.dateFromRouteData)))
      .pipe(map((singleTasks: SingleTaskModel[] | undefined) => {
        if (singleTasks !== undefined) {
          if (!singleTasks.length) {
            this.store.dispatch(new DailyTasksRequested(
              {date: this.dateFromRouteData }
            ));
          }
        }
        return singleTasks;
      }));

  }

  getTmrwRouterStr(dateFromRouteData: string) {
    let date = new Date(dateFromRouteData);
    let tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    let dateTimeObj = tomorrow;
    return getDateString(
      dateTimeObj.getUTCDate(),
      dateTimeObj.getUTCMonth() + 1,
      dateTimeObj.getUTCFullYear()
    );
  }

  getYstrdyRouterStr(dateFromRouteData: string) {
    let date = new Date(dateFromRouteData);
    let yesterday = new Date(date);
    yesterday.setDate(yesterday.getDate() - 1);
    let dateTimeObj = yesterday;
    return getDateString(
      dateTimeObj.getUTCDate(),
      dateTimeObj.getUTCMonth() + 1,
      dateTimeObj.getUTCFullYear()
    );
  }


  navToTmrrow() {
    console.log(this.tmrwRouterStr);
    this.router.navigate(['/', 'authenticated-user', 'tasks-daily', this.tmrwRouterStr]);
    this.dateFromRouteData = this.tmrwRouterStr;
    this.tmrwRouterStr = this.getTmrwRouterStr(this.dateFromRouteData);
    this.ystrdyRouterStr = this.getYstrdyRouterStr(this.dateFromRouteData);
    this.dailyTasks$ = this.store.pipe(
      select(selectSingleTasksByDate(this.dateFromRouteData)))
      .pipe(map((tasks: SingleTaskModel[] | undefined) => {
        if (tasks !== undefined) {
          if (!tasks.length) {
            this.store.dispatch(new DailyTasksRequested(
              {date: this.dateFromRouteData }
            ));
          }
        }
        return tasks;
      }));
  }

  navToYsdtrdy() {
    console.log(this.ystrdyRouterStr);
    this.router.navigate(['/', 'authenticated-user', 'tasks-daily', this.ystrdyRouterStr]);
    this.dateFromRouteData = this.ystrdyRouterStr;
    this.tmrwRouterStr = this.getTmrwRouterStr(this.dateFromRouteData);
    this.ystrdyRouterStr = this.getYstrdyRouterStr(this.dateFromRouteData);
    this.dailyTasks$ = this.store.pipe(
      select(selectSingleTasksByDate(this.dateFromRouteData)))
      .pipe(map((tasks: SingleTaskModel[] | undefined) => {
        if (tasks !== undefined) {
          if (!tasks.length) {
            this.store.dispatch(new DailyTasksRequested(
              {date: this.dateFromRouteData }
            ));
          }
        }
        return tasks;
      }));
  }

  onConfirmTaskCompletion(id: number) {
    const payload = { id: +id };
    this.store.dispatch(
      new SingleTaskConfirmationRequested(payload)
    );
  }



}
