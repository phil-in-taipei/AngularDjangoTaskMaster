import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { IntervalTaskGroupsState } from '../../state/interval-task-groups/interval-task-group.reducers';
import { 
  IntervalTaskSchedulerDeletionRequested 
} from '../../state/interval-task-groups/interval-task-group.actions';
import { IntervalTaskModel } from 'src/app/models/interval-task-group.model';

@Component({
  selector: 'app-interval-task',
  standalone: false,
  templateUrl: './interval-task.component.html',
  styleUrl: './interval-task.component.css'
})
export class IntervalTaskComponent {

  @Input() taskGroupId: number;

  @Input() intervalTask: IntervalTaskModel;

  deletionPopupVisible: boolean = false;

  constructor(private store: Store<IntervalTaskGroupsState>) { }

  showDeletionPopup() {
    this.deletionPopupVisible = true;
  }

  hideDeletionPopup() {
    this.deletionPopupVisible = false;
  }

  onRemoveTask() {
    const payload = { 
      taskGroupId: this.taskGroupId,
      intervalTaskId: +this.intervalTask.id };
    this.store.dispatch(
      new IntervalTaskSchedulerDeletionRequested(payload)
    );
  }

}
