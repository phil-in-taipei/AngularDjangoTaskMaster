import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { 
  IntervalTaskGroupsState 
} from '../../state/interval-task-groups/interval-task-group.reducers';
import { 
  IntervalTaskGroupCreateModel 
} from 'src/app/models/interval-task-group.model';
import { 
  IntervalTaskGroupCreateSubmitted, 
  IntervalTaskGroupCreationCancelled 
} from '../../state/interval-task-groups/interval-task-group.actions';

@Component({
  selector: 'app-create-interval-task-group-form',
  standalone: false,
  templateUrl: './create-interval-task-group-form.component.html',
  styleUrl: './create-interval-task-group-form.component.css'
})
export class CreateIntervalTaskGroupFormComponent {

  constructor(private store: Store<IntervalTaskGroupsState>) { }


  onSubmitIntervalTaskGroup(form: NgForm) {

    if (form.invalid) {
      this.store.dispatch(new IntervalTaskGroupCreationCancelled({err: {
        error: {
          message: "The form values were not properly filled in!"
        }
      }} ));
      form.reset();
      return;
    }
    let submissionForm: IntervalTaskGroupCreateModel = {
      taskGroupName: form.value.taskGroupName,
      intervalInDays: form.value.intervalInDays,
    }
    this.store.dispatch(new IntervalTaskGroupCreateSubmitted(
      { intervalTaskGroup: submissionForm }
    ));
    form.resetForm();
  }



}
