import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
import { select, Store } from '@ngrx/store';

import {
  IntervalTaskGroupAppliedQuarterlysCleared,
  IntervalTaskGroupAppliedQuarterlysRequested
} from '../../state/groups-applied-quarterly/interval-task-group-applied-quarterly.actions';
import {
  IntervalTaskGroupAppliedQuarterlysState
} from '../../state/groups-applied-quarterly/interval-task-group-applied-quarterly.reducers';
import {
  IntervalTaskGroupAppliedQuarterlyModel
} from 'src/app/models/interval-task-group.model';
import {
  SingleTasksCleared
} from '../../../single/state/single-task.actions';
import {
  SingleTasksState
} from '../../../single/state/single-task.reducers';
import { 
  selectAllIntervalTaskGroupAppliedQuarterlys 
} from '../../state/groups-applied-quarterly/interval-task-group-applied-quarterly.selectors';

@Component({
  selector: 'app-interval-task-group-applied-quarterly-list',
  standalone: false,
  templateUrl: './interval-task-group-quarterly-list.component.html',
  styleUrl: './interval-task-group-quarterly-list.component.css'
})
export class IntervalTaskGroupAppliedQuarterlyListComponent implements OnInit {

  itgaq$: Observable<IntervalTaskGroupAppliedQuarterlyModel[] | undefined> = of(undefined);
  quarterFromRouteData:string;
  yearFromRouteData:number;
  showApplySchedulerSubmitForm:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store<IntervalTaskGroupAppliedQuarterlysState>,
    private tasksStore: Store<SingleTasksState>
  ) { }

  ngOnInit(): void {
    this.tasksStore.dispatch(new SingleTasksCleared());
    this.store.dispatch(new IntervalTaskGroupAppliedQuarterlysCleared());
    this.quarterFromRouteData = this.route.snapshot.params['quarter'];
    this.yearFromRouteData = +this.route.snapshot.params['year'];
    this.store.dispatch(new IntervalTaskGroupAppliedQuarterlysRequested({
      quarter: this.quarterFromRouteData,
      year: this.yearFromRouteData
    }));
    this.itgaq$ = this.store.pipe(
      select(selectAllIntervalTaskGroupAppliedQuarterlys)
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

