import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { MonthlyTasksState } from '../../state/monthly-schedulers/monthly-task.reducers';
import { MonthlyTaskCreateModel } from 'src/app/models/monthly-task.model';
import { 
  MonthlyTaskSchedulerCreateSubmitted, 
  MonthlyTaskSchedulerCreationCancelled 
} from '../../state/monthly-schedulers/monthly-task.actions';


@Component({
  selector: 'app-create-monthly-task-form',
  standalone: false,
  templateUrl: './create-monthly-task-form.component.html',
  styleUrl: './create-monthly-task-form.component.css'
})
export class CreateMonthlyTaskFormComponent {

  constructor(private store: Store<MonthlyTasksState>) { }

  onSubmitMonthlyTask(form: NgForm) {

    if (form.invalid) {
      this.store.dispatch(new MonthlyTaskSchedulerCreationCancelled({err: {
        error: {
          message: "The form values were not properly filled in!"
        }
      }} ));
      form.reset();
      return;
    }
    let submissionForm: MonthlyTaskCreateModel = {
      day_of_month: form.value.dayOfMonth,
      monthly_task_name: form.value.monthlyTaskName,
    }
    this.store.dispatch(new MonthlyTaskSchedulerCreateSubmitted(
      { monthlyTask: submissionForm }
    ));
    form.resetForm();
  }


}
