import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from "rxjs";

import { 
  IntervalTaskGroupsState 
} from '../../state/interval-task-groups/interval-task-group.reducers';
import { 
  intervalTaskGroupsErrorMsg, intervalTaskGroupsSuccessMsg 
} from '../../state/interval-task-groups/interval-task-group.selectors';
import { 
  IntervalTasksMessagesCleared 
} from '../../state/interval-task-groups/interval-task-group.actions';

@Component({
  selector: 'app-create-interval-task-group',
  standalone: false,
  templateUrl: './create-interval-task-group.component.html',
  styleUrl: './create-interval-task-group.component.css'
})
export class CreateIntervalTaskGroupComponent implements OnInit {

  errMsg$: Observable<string | undefined> = of(undefined);
  successMsg$: Observable<string | undefined> = of(undefined);

  constructor(private store: Store<IntervalTaskGroupsState>) { }

  ngOnInit(): void {
    this.store.dispatch(new IntervalTasksMessagesCleared());
    this.errMsg$ = this.store.pipe(
      select(intervalTaskGroupsErrorMsg)
    );
    this.successMsg$ = this.store.pipe(
      select(intervalTaskGroupsSuccessMsg)
    );
  }

  onClearStatusMsgs() {
    this.store.dispatch(new IntervalTasksMessagesCleared());
  }

}
