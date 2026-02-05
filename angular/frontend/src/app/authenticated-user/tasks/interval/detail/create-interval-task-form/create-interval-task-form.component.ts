import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Store } from '@ngrx/store';
import { 
  IntervalTaskGroupsState 
} from '../../state/interval-task-groups/interval-task-group.reducers';
import { 
  IntervalTaskCreateModel 
} from 'src/app/models/interval-task-group.model';
import { 
  IntervalTaskSchedulerCreateSubmitted, 
  IntervalTaskSchedulerCreationCancelled 
} from '../../state/interval-task-groups/interval-task-group.actions';

@Component({
  selector: 'app-create-interval-task-form',
  standalone: false,
  templateUrl: './create-interval-task-form.component.html',
  styleUrl: './create-interval-task-form.component.css'
})
export class CreateIntervalTaskFormComponent {

  @Input() intervalTaskGroupId: number;
  @Output() closeEvent = new EventEmitter<boolean>();

  constructor(
    private store: Store<IntervalTaskGroupsState>
  ) { }

  onSubmitIntervalTask(form: NgForm) {

    if (form.invalid) {
      this.store.dispatch(new IntervalTaskSchedulerCreationCancelled({err: {
        error: {
          message: "The form values were not properly filled in!"
        }
      }} ));
      form.reset();
      return;
    }
    let submissionForm: IntervalTaskCreateModel = {
      intervalTaskGroupId: this.intervalTaskGroupId,
      intervalTaskName: form.value.taskName,
    }
    this.store.dispatch(new IntervalTaskSchedulerCreateSubmitted(
      { intervalTask: submissionForm }
    ));
    form.resetForm();
    this.closeEvent.emit(false);
  }
}
