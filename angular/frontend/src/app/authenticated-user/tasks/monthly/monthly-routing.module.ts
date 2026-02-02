import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { 
  MonthlyAppliedQuarterlyListComponent 
} from './applied-quarterly/monthly-applied-quarterly-list/monthly-applied-quarterly-list.component';
import { MonthlyComponent } from './monthly/monthly.component';
import { 
  MonthlyTaskListComponent 
} from './list/monthly-task-list/monthly-task-list.component';
import { 
  CreateMonthlyTaskComponent 
} from './create/create-monthly-task/create-monthly-task.component';
import { 
  SelectMonthlyQuarterComponent 
} from './applied-quarterly/select-monthly-quarter/select-monthly-quarter.component';

const routes: Routes = [
  { path: '', component: MonthlyComponent, children: [ 
    { 
      path: 'applied-quarterly/:quarter/:year', 
      component: MonthlyAppliedQuarterlyListComponent 
    },
    { path: 'create', component: CreateMonthlyTaskComponent },
    { path: 'list', component: MonthlyTaskListComponent },
    { path: 'select-quarterly', component: SelectMonthlyQuarterComponent },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonthlyRoutingModule { }
