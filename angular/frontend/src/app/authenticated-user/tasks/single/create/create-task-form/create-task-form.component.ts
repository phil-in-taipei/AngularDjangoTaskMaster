import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';

import { SingleTaskCreateModel } from 'src/app/models/single-task.model';
import { 
  SingleTaskCreateSubmitted, SingleTaskCreationCancelled 
} from '../../state/single-task.actions';

@Component({
  selector: 'app-create-task-form',
  standalone: false,
  templateUrl: './create-task-form.component.html',
  styleUrl: './create-task-form.component.css'
})
export class CreateTaskFormComponent {

  dateModel: Date;

  constructor(private store: Store<AppState>) { }

  getFormattedDateString(year: number, month: number, day: number): string {
    let monthString = month.toString();
    if (month < 10) {
      monthString = `0${month}`;
    }
    let dayString = day.toString();
    if (day < 10) {
      dayString = `0${day}`;
    }
    return `${year.toString()}-${monthString}-${dayString}`;
  }

  onSubmitSingleTask(form: NgForm) {

    if (form.invalid) {
      this.store.dispatch(new SingleTaskCreationCancelled({err: {
        error: {
          message: "The form values were not properly filled in!"
        }
      }} ));
      form.reset();
      return;
    }
    let submissionForm: SingleTaskCreateModel = {
      date: this.getFormattedDateString(
        form.value.date.year, 
        form.value.date.month, 
        form.value.date.day
        ),
      task_name: form.value.taskName,
    }
    this.store.dispatch(new SingleTaskCreateSubmitted(
      { singleTask: submissionForm }
    ));
    form.resetForm();
  }

}
