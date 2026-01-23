import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/reducers';
import { getDateString } from 'src/app/shared-utils/date-time.util';
import { 
  SingleTaskEditCancelled, SingleTaskEditSubmitted 
} from '../../state/single-task.actions';
import { 
  SingleTaskModel, SingleTaskRescheduleModel 
} from 'src/app/models/single-task.model';

@Component({
  selector: 'app-reschedule-task-form',
  standalone: false,
  templateUrl: './reschedule-task-form.component.html',
  styleUrl: './reschedule-task-form.component.css'
})
export class RescheduleTaskFormComponent {

  dateModel: Date;
  @Input() singleTask: SingleTaskModel;
  @Output() closeFormEvent = new EventEmitter<boolean>();

  constructor(private store: Store<AppState>) { }

  onSubmitSingleTask(form: NgForm) {

    if (form.invalid) {
      this.store.dispatch(new SingleTaskEditCancelled({err: {
        error: {
          message: "The form values were not properly filled in!"
        }
      }} ));
      form.reset();
      return;
    }
    let submissionForm: SingleTaskRescheduleModel = {
      date: getDateString(
        form.value.date.day, 
        form.value.date.month, 
        form.value.date.year
        ),
      comments: form.value.comments,
    }
    this.store.dispatch(new SingleTaskEditSubmitted(
      { 
        id: this.singleTask.id,
        singleTask: submissionForm 
      }
    ));
    form.resetForm();
    this.closeFormEvent.emit(false);
  }


}
