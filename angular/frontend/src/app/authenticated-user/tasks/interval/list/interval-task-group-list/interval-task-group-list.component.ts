import { Component, OnInit } from '@angular/core';
import { Observable, of } from "rxjs";
import {select, Store } from '@ngrx/store';

import { 
  IntervalTaskGroupsState 
} from '../../state/interval-task-groups/interval-task-group.reducers';
import { 
  selectAllIntervalTaskGroups, selectIntervalTaskGroupsLoaded 
} from '../../state/interval-task-groups/interval-task-group.selectors';
import { IntervalTaskGroupModel } from 'src/app/models/interval-task-group.model';

@Component({
  selector: 'app-interval-task-group-list',
  standalone: false,
  templateUrl: './interval-task-group-list.component.html',
  styleUrl: './interval-task-group-list.component.css'
})
export class IntervalTaskGroupListComponent implements OnInit{

  intervalTaskGroups$: Observable<IntervalTaskGroupModel[] | undefined> = of(undefined);
  intervalTaskGroupsLoaded$: Observable<boolean> = of(false);

  constructor(private store: Store<IntervalTaskGroupsState>) { }

  ngOnInit(): void {
    this.intervalTaskGroups$ = this.store.pipe(
      select(selectAllIntervalTaskGroups)
    );
    this.intervalTaskGroupsLoaded$ = this.store.pipe(
      select(selectIntervalTaskGroupsLoaded)
    );
  }

  trackByFn(index: number, item: any) {
    return item.id;
  }
}
