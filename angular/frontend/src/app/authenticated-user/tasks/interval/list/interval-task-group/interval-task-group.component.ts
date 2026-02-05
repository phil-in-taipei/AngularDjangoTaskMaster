import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { IntervalTaskGroupsState } from '../../state/interval-task-groups/interval-task-group.reducers';
import { 
  IntervalTaskGroupDeletionRequested 
} from '../../state/interval-task-groups/interval-task-group.actions';
import { IntervalTaskGroupModel } from 'src/app/models/interval-task-group.model';

@Component({
  selector: 'app-interval-task-group',
  standalone: false,
  templateUrl: './interval-task-group.component.html',
  styleUrl: './interval-task-group.component.css'
})
export class IntervalTaskGroupComponent {
  
  @Input() intervalTaskGroup: IntervalTaskGroupModel;

  deletionPopupVisible: boolean = false;

  constructor(private store: Store<IntervalTaskGroupsState>) { }

  showDeletionPopup() {
    this.deletionPopupVisible = true;
  }

  hideDeletionPopup() {
    this.deletionPopupVisible = false;
  }

  onRemoveTask() {
    const payload = { id: +this.intervalTaskGroup.id };
    this.store.dispatch(
      new IntervalTaskGroupDeletionRequested(payload)
    );
  }

  trackByFn(index: number, item: any) {
    return item.id;
  }

}
