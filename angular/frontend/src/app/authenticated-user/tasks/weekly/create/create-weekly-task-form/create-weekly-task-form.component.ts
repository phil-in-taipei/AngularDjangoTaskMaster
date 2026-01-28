import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { WeeklyTasksState } from '../../state/weekly-schedulers/weekly-task.reducers';
import { WeeklyTaskCreateModel } from 'src/app/models/weekly-task.model';
import { 
  WeeklyTaskSchedulerCreateSubmitted, 
  WeeklyTaskSchedulerCreationCancelled 
} from '../../state/weekly-schedulers/weekly-task.actions';

@Component({
  selector: 'app-create-weekly-task-form',
  standalone: false,
  templateUrl: './create-weekly-task-form.component.html',
  styleUrl: './create-weekly-task-form.component.css'
})
export class CreateWeeklyTaskFormComponent {

  daysOfWeek: string[] = [
    'SUNDAY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY'
  ];

  constructor(private store: Store<WeeklyTasksState>) { }


  onSubmitWeeklyTask(form: NgForm) {

    if (form.invalid) {
      this.store.dispatch(new WeeklyTaskSchedulerCreationCancelled({err: {
        error: {
          message: "The form values were not properly filled in!"
        }
      }} ));
      form.reset();
      return;
    }
    let submissionForm: WeeklyTaskCreateModel = {
      day_of_week: form.value.dayOfWeek,
      weekly_task_name: form.value.weeklyTaskName,
    }
    this.store.dispatch(new WeeklyTaskSchedulerCreateSubmitted(
      { weeklyTask: submissionForm }
    ));
    form.resetForm();
  }

}
