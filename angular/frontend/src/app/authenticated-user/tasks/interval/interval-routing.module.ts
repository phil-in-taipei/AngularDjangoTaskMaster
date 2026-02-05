import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntervalComponent } from './interval/interval.component';
import { 
  CreateIntervalTaskGroupComponent 
} from './create/create-interval-task-group/create-interval-task-group.component';
import { 
  IntervalTaskGroupDetailComponent 
} from './detail/interval-task-group-detail/interval-task-group-detail.component';
import { 
  IntervalTaskGroupListComponent 
} from './list/interval-task-group-list/interval-task-group-list.component';
import { IntervalTaskGroupAppliedQuarterlyListComponent } from './applied-quarterly/interval-task-group-quarterly-list/interval-task-group-quarterly-list.component';
import { SelectIntervalTaskGroupQuarterComponent } from './applied-quarterly/select-interval-task-group-quarter/select-interval-task-group-quarter.component';

const routes: Routes = [
  { path: '', component: IntervalComponent, children: [ 
    { 
      path: 'applied-quarterly/:quarter/:year', 
      component: IntervalTaskGroupAppliedQuarterlyListComponent 
    },
    { path: 'create', component: CreateIntervalTaskGroupComponent },
    { path: 'list', component: IntervalTaskGroupListComponent },
    { path: 'detail/:id', component: IntervalTaskGroupDetailComponent },
    { 
      path: 'select-quarterly', 
      component: SelectIntervalTaskGroupQuarterComponent 
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntervalRoutingModule { }
