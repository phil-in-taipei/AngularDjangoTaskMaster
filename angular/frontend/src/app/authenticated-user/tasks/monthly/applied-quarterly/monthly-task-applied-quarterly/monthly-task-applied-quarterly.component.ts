import { Component, Input } from '@angular/core';

import { Store } from '@ngrx/store';
import { 
  MonthlyTaskAppliedQuarterlysState 
} from '../../state/schedulers-applied-quarterly/monthly-applied-quarterly.reducers';
import { MonthlyTaskAppliedQuarterlyModel } from 'src/app/models/monthly-task.model';
import { 
  MonthlyTaskAppliedQuarterlyDeletionRequested 
} from '../../state/schedulers-applied-quarterly/monthly-applied-quarterly.actions';

@Component({
  selector: 'app-monthly-task-applied-quarterly',
  standalone: false,
  templateUrl: './monthly-task-applied-quarterly.component.html',
  styleUrl: './monthly-task-applied-quarterly.component.css'
})
export class MonthlyTaskAppliedQuarterlyComponent {

  @Input() monthlyTaskAppliedQuarterly: MonthlyTaskAppliedQuarterlyModel;
  deletionPopupVisible: boolean = false;

  constructor(
    private store: Store<MonthlyTaskAppliedQuarterlysState>,
  ) { }

  showDeletionPopup() {
    this.deletionPopupVisible = true;
  }

  hideDeletionPopup() {
    this.deletionPopupVisible = false;
  }

  onRemoveMTAQ() {
    const payload = { id: +this.monthlyTaskAppliedQuarterly.id };
    this.store.dispatch(
      new MonthlyTaskAppliedQuarterlyDeletionRequested(payload)
    );
  }

}
