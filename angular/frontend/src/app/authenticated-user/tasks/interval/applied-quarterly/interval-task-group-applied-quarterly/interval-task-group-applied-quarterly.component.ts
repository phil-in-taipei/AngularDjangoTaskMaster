import { Component, Input } from '@angular/core';

import { Store } from '@ngrx/store';
import {
  IntervalTaskGroupAppliedQuarterlysState
} from '../../state/groups-applied-quarterly/interval-task-group-applied-quarterly.reducers';
import { IntervalTaskGroupAppliedQuarterlyModel } from 'src/app/models/interval-task-group.model';
import {
  IntervalTaskGroupAppliedQuarterlyDeletionRequested
} from '../../state/groups-applied-quarterly/interval-task-group-applied-quarterly.actions';

@Component({
  selector: 'app-interval-task-group-applied-quarterly',
  standalone: false,
  templateUrl: './interval-task-group-applied-quarterly.component.html',
  styleUrl: './interval-task-group-applied-quarterly.component.css'
})
export class IntervalTaskGroupAppliedQuarterlyComponent {

  @Input() intervalTaskGroupAppliedQuarterly: IntervalTaskGroupAppliedQuarterlyModel;
  deletionPopupVisible: boolean = false;

  constructor(
    private store: Store<IntervalTaskGroupAppliedQuarterlysState>,
  ) { }

  showDeletionPopup() {
    this.deletionPopupVisible = true;
  }

  hideDeletionPopup() {
    this.deletionPopupVisible = false;
  }

  onRemoveITGAQ() {
    this.store.dispatch(
      new IntervalTaskGroupAppliedQuarterlyDeletionRequested(
        { id: +this.intervalTaskGroupAppliedQuarterly.id }
      )
    );
  }

}

