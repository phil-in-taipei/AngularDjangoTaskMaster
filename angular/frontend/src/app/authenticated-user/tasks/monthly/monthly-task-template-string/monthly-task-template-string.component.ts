import { Component, OnInit, Input } from '@angular/core';
import { of, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { 
  MonthlyTasksState 
} from '../state/monthly-schedulers/monthly-task.reducers';
import { MonthlyTaskModel } from 'src/app/models/monthly-task.model';
import { 
  selectMonthlyTaskSchedulerById 
} from '../state/monthly-schedulers/monthly-task.selectors';


@Component({
  selector: 'app-monthly-task-template-string',
  standalone: false,
  templateUrl: './monthly-task-template-string.component.html',
  styleUrl: './monthly-task-template-string.component.css'
})
export class MonthlyTaskTemplateStringComponent implements OnInit {

  monthlyTask$: Observable<MonthlyTaskModel | undefined> = of(undefined);
  @Input() monthlyTaskId: number;

  ngOnInit(): void {
    this.monthlyTask$ = this.store.pipe(select(
      selectMonthlyTaskSchedulerById(this.monthlyTaskId)
    ));
  }

  constructor(
    private store: Store<MonthlyTasksState>
  ) {}

}
