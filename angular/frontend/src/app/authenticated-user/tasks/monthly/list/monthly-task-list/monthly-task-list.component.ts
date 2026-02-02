import { Component } from '@angular/core';
import { Observable, of } from "rxjs";
import {select, Store } from '@ngrx/store';

import { MonthlyTasksState } from '../../state/monthly-schedulers/monthly-task.reducers';
import { 
  selectAllMonthlyTaskSchedulers, selectMonthlyTasksLoaded 
} from '../../state/monthly-schedulers/monthly-task.selectors';
import { MonthlyTaskModel } from 'src/app/models/monthly-task.model';

@Component({
  selector: 'app-monthly-task-list',
  standalone: false,
  templateUrl: './monthly-task-list.component.html',
  styleUrl: './monthly-task-list.component.css'
})
export class MonthlyTaskListComponent {

  monthlyTaskSchedulers$: Observable<MonthlyTaskModel[] | undefined> = of(undefined);
  schedulersLoaded$: Observable<boolean> = of(false);

  constructor(private store: Store<MonthlyTasksState>) { }

  ngOnInit(): void {
    this.monthlyTaskSchedulers$ = this.store.pipe(
      select(selectAllMonthlyTaskSchedulers)
    );
    this.schedulersLoaded$ = this.store.pipe(
      select(selectMonthlyTasksLoaded)
    );
  }

  trackByFn(index: number, item: any) {
    return item.id;
  }

}
