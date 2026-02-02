import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from "rxjs";

import { MonthlyTasksState } from '../../state/monthly-schedulers/monthly-task.reducers';
import { 
  monthlyTaskErrorMsg, monthlyTaskSuccessMsg 
} from '../../state/monthly-schedulers/monthly-task.selectors';
import { MonthlyTasksMessagesCleared
 } from '../../state/monthly-schedulers/monthly-task.actions';

@Component({
  selector: 'app-create-monthly-task',
  standalone: false,
  templateUrl: './create-monthly-task.component.html',
  styleUrl: './create-monthly-task.component.css'
})
export class CreateMonthlyTaskComponent {

  errMsg$: Observable<string | undefined> = of(undefined);
  successMsg$: Observable<string | undefined> = of(undefined);

  constructor(private store: Store<MonthlyTasksState>) { }

  ngOnInit(): void {
    this.store.dispatch(new MonthlyTasksMessagesCleared());
    this.errMsg$ = this.store.pipe(
      select(monthlyTaskErrorMsg)
    );
    this.successMsg$ = this.store.pipe(
      select(monthlyTaskSuccessMsg)
    );
  }

  onClearStatusMsgs() {
    this.store.dispatch(new MonthlyTasksMessagesCleared());
  }

}
