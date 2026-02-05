import { Component, OnInit, Input } from '@angular/core';
import { of, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { IntervalTaskGroupsState } from '../state/interval-task-groups/interval-task-group.reducers';
import { IntervalTaskGroupModel } from 'src/app/models/interval-task-group.model';
import { 
  selectIntervalTaskGroupById 
} from '../state/interval-task-groups/interval-task-group.selectors';

@Component({
  selector: 'app-interval-task-group-template-string',
  standalone: false,
  templateUrl: './interval-task-group-template-string.component.html',
  styleUrl: './interval-task-group-template-string.component.css'
})
export class IntervalTaskGroupTemplateStringComponent implements OnInit {

  intervalTaskGroup$: Observable<IntervalTaskGroupModel | undefined> = of(undefined);
  @Input() intervalTaskGroupId: number;

  ngOnInit(): void {
    console.log('********************************************************')
    console.log('this is the interval task group id in the template string: ' 
    + this.intervalTaskGroupId);
    console.log('********************************************************')
    this.intervalTaskGroup$ = this.store.pipe(select(
      selectIntervalTaskGroupById(this.intervalTaskGroupId)
    ));
  }

  constructor(
    private store: Store<IntervalTaskGroupsState>
  ) {}

}
