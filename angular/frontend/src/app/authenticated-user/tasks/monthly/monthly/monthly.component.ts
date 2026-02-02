import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { MonthlyTasksState } from '../state/monthly-schedulers/monthly-task.reducers';
import { MonthlyTaskSchedulersRequested } from '../state/monthly-schedulers/monthly-task.actions';

@Component({
  selector: 'app-monthly',
  standalone: false,
  templateUrl: './monthly.component.html',
  styleUrl: './monthly.component.css'
})
export class MonthlyComponent implements OnInit {

  constructor(private store: Store<MonthlyTasksState>) { }

  ngOnInit(): void {
    this.store.dispatch(new MonthlyTaskSchedulersRequested());
  }
}
