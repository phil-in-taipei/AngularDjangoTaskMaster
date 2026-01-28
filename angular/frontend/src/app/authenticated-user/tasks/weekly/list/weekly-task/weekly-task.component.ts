import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { WeeklyTasksState } from '../../state/weekly-schedulers/weekly-task.reducers';
import { 
  WeeklyTaskSchedulerDeletionRequested 
} from '../../state/weekly-schedulers/weekly-task.actions';
import { WeeklyTaskModel } from 'src/app/models/weekly-task.model';

@Component({
  selector: 'app-weekly-task',
  standalone: false,
  templateUrl: './weekly-task.component.html',
  styleUrl: './weekly-task.component.css'
})
export class WeeklyTaskComponent {

  @Input() weeklyTaskScheduler: WeeklyTaskModel;

  deletionPopupVisible: boolean = false;

  constructor(private store: Store<WeeklyTasksState>) { }

  showDeletionPopup() {
    this.deletionPopupVisible = true;
  }

  hideDeletionPopup() {
    this.deletionPopupVisible = false;
  }

  onRemoveTask() {
    const payload = { id: +this.weeklyTaskScheduler.id };
    this.store.dispatch(
      new WeeklyTaskSchedulerDeletionRequested(payload)
    );
  }

}
