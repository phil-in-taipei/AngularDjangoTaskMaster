import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/reducers';
import { SingleTaskDeletionRequested } from '../../state/single-task.actions';
import { SingleTaskModel } from 'src/app/models/single-task.model';


@Component({
  selector: 'app-single-task',
  standalone: false,
  templateUrl: './single-task.component.html',
  styleUrl: './single-task.component.css'
})
export class SingleTaskComponent {

  @Input() singleTask: SingleTaskModel;

  deletionPopupVisible: boolean = false;

  constructor(private store: Store<AppState>) { }


  showDeletionPopup() {
    this.deletionPopupVisible = true;
  }

  hideDeletionPopup() {
    this.deletionPopupVisible = false;
  }

  onRemoveTask() {
    const payload = { id: +this.singleTask.id };
    this.store.dispatch(
      new SingleTaskDeletionRequested(payload)
    );
  }


}
