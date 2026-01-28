import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from "rxjs";

import { WeeklyTasksState } from '../../state/weekly-schedulers/weekly-task.reducers';
import { 
  weeklyTaskErrorMsg, weeklyTaskSuccessMsg 
} from '../../state/weekly-schedulers/weekly-task.selectors';
import { WeeklyTasksMessagesCleared } from '../../state/weekly-schedulers/weekly-task.actions';

@Component({
  selector: 'app-create-weekly-task',
  standalone: false,
  templateUrl: './create-weekly-task.component.html',
  styleUrl: './create-weekly-task.component.css'
})
export class CreateWeeklyTaskComponent {

  errMsg$: Observable<string | undefined> = of(undefined);
  successMsg$: Observable<string | undefined> = of(undefined);

  constructor(private store: Store<WeeklyTasksState>) { }

  ngOnInit(): void {
    this.store.dispatch(new WeeklyTasksMessagesCleared());
    this.errMsg$ = this.store.pipe(
      select(weeklyTaskErrorMsg)
    );
    this.successMsg$ = this.store.pipe(
      select(weeklyTaskSuccessMsg)
    );
  }

  onClearStatusMsgs() {
    this.store.dispatch(new WeeklyTasksMessagesCleared());
  }

}
