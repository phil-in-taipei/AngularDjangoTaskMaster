import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
import { select, Store } from '@ngrx/store';

import {
  WeeklyTaskAppliedQuarterlysCleared,
  WeeklyTaskAppliedQuarterlysRequested
} from '../../state/schedulers-applied-quarterly/weekly-applied-quarterly.actions';
import {
  WeeklyTaskAppliedQuarterlysState
} from '../../state/schedulers-applied-quarterly/weekly-applied-quarterly.reducers';
import {
  WeeklyTaskAppliedQuarterlyModel
} from 'src/app/models/weekly-task.model';
import {
  SingleTasksCleared
} from '../../../single/state/single-task.actions';
import {
  SingleTasksState
} from '../../../single/state/single-task.reducers';
import { selectAllWeeklyTaskAppliedQuarterlys } from '../../state/schedulers-applied-quarterly/weekly-applied-quarterly.selectors';

@Component({
  selector: 'app-weekly-applied-quarterly-list',
  standalone: false,
  templateUrl: './weekly-applied-quarterly-list.component.html',
  styleUrl: './weekly-applied-quarterly-list.component.css'
})
export class WeeklyAppliedQuarterlyListComponent implements OnInit {

  wTAQ$: Observable<WeeklyTaskAppliedQuarterlyModel[] | undefined> = of(undefined);
  quarterFromRouteData:string;
  yearFromRouteData:number;
  showApplySchedulerSubmitForm:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store<WeeklyTaskAppliedQuarterlysState>,
    private tasksStore: Store<SingleTasksState>
  ) { }

  ngOnInit(): void {
    this.tasksStore.dispatch(new SingleTasksCleared());
    this.store.dispatch(new WeeklyTaskAppliedQuarterlysCleared());
    this.quarterFromRouteData = this.route.snapshot.params['quarter'];
    this.yearFromRouteData = +this.route.snapshot.params['year'];
    this.store.dispatch(new WeeklyTaskAppliedQuarterlysRequested({
      quarter: this.quarterFromRouteData,
      year: this.yearFromRouteData
    }));
    this.wTAQ$ = this.store.pipe(
      select(selectAllWeeklyTaskAppliedQuarterlys)
    );
  }

  toggleApplySchedulerSubmitForm() {
    if (this.showApplySchedulerSubmitForm) {
      this.showApplySchedulerSubmitForm = false;
    } else {
      this.showApplySchedulerSubmitForm = true;
    }
  }

}
