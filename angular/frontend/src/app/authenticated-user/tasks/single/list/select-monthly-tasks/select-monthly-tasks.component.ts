import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { 
  getYearsOptions, monthsAndIntegers 
} from 'src/app/shared-utils/date-time.util';
import { 
  SingleTasksCleared, MonthlyTasksRequested 
} from '../../state/single-task.actions';


@Component({
  selector: 'app-select-monthly-tasks',
  standalone: false,
  templateUrl: './select-monthly-tasks.component.html',
  styleUrl: './select-monthly-tasks.component.css'
})
export class SelectMonthlyTasksComponent implements OnInit {


  monthsAndIntegers: [string, number][] = monthsAndIntegers;
  years: Number[] = [];
  @Output() closeMonthlySelectFormEvent = new EventEmitter<boolean>();

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.years = getYearsOptions();
  }

  onSubmitMonthlySelectorForm(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.store.dispatch(new SingleTasksCleared);
    console.log('valid!')
    this.store.dispatch(new MonthlyTasksRequested(
      {month: form.value.month, year: form.value.year }
    ));
    this.closeMonthlySelectFormEvent.emit(false);
  }
}
