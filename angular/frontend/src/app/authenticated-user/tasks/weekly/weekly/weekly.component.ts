import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { WeeklyTasksState } from '../state/weekly-schedulers/weekly-task.reducers';
import { 
  WeeklyTaskSchedulersRequested 
} from '../state/weekly-schedulers/weekly-task.actions';


@Component({
  selector: 'app-weekly',
  standalone: false,
  templateUrl: './weekly.component.html',
  styleUrl: './weekly.component.css'
})
export class WeeklyComponent implements OnInit {

  constructor(private store: Store<WeeklyTasksState>) { }

  ngOnInit(): void {
    this.store.dispatch(new WeeklyTaskSchedulersRequested());
  }
}
