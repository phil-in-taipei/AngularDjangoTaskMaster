import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { MonthlyTasksState } from '../../state/monthly-schedulers/monthly-task.reducers';
import {
  MonthlyTaskSchedulerDeletionRequested
} from '../../state/monthly-schedulers/monthly-task.actions';
import { MonthlyTaskModel } from 'src/app/models/monthly-task.model';

@Component({
  selector: 'app-monthly-task',
  standalone: false,
  templateUrl: './monthly-task.component.html',
  styleUrl: './monthly-task.component.css'
})
export class MonthlyTaskComponent {

  @Input() monthlyTaskScheduler: MonthlyTaskModel;

  deletionPopupVisible: boolean = false;

  constructor(private store: Store<MonthlyTasksState>) { }

  showDeletionPopup() {
    this.deletionPopupVisible = true;
  }

  hideDeletionPopup() {
    this.deletionPopupVisible = false;
  }

  onRemoveTask() {
    const payload = { id: +this.monthlyTaskScheduler.id };
    this.store.dispatch(
      new MonthlyTaskSchedulerDeletionRequested(payload)
    );
  }

}
