import { Component, Input } from '@angular/core';

import { Store } from '@ngrx/store';
import {
  WeeklyTaskAppliedQuarterlysState
} from '../../state/schedulers-applied-quarterly/weekly-applied-quarterly.reducers';
import { WeeklyTaskAppliedQuarterlyModel } from 'src/app/models/weekly-task.model';
import {
  WeeklyTaskAppliedQuarterlyDeletionRequested
} from '../../state/schedulers-applied-quarterly/weekly-applied-quarterly.actions';

@Component({
  selector: 'app-weekly-task-applied-quarterly',
  standalone: false,
  templateUrl: './weekly-task-applied-quarterly.component.html',
  styleUrl: './weekly-task-applied-quarterly.component.css'
})
export class WeeklyTaskAppliedQuarterlyComponent {

  @Input() weeklyTaskAppliedQuarterly: WeeklyTaskAppliedQuarterlyModel;
  deletionPopupVisible: boolean = false;

  constructor(
    private store: Store<WeeklyTaskAppliedQuarterlysState>,
  ) { }

  showDeletionPopup() {
    this.deletionPopupVisible = true;
  }

  hideDeletionPopup() {
    this.deletionPopupVisible = false;
  }

  onRemoveWTAQ() {
    const payload = { id: +this.weeklyTaskAppliedQuarterly.id };
    this.store.dispatch(
      new WeeklyTaskAppliedQuarterlyDeletionRequested(payload)
    );
  }

}
