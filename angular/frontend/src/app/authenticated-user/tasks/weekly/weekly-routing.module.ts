import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeeklyComponent } from './weekly/weekly.component';
import { CreateWeeklyTaskComponent } from './create/create-weekly-task/create-weekly-task.component';
import { 
  SelectWeeklyQuarterComponent 
} from './applied-quarterly/select-weekly-quarter/select-weekly-quarter.component';
import { 
  WeeklyAppliedQuarterlyListComponent 
} from './applied-quarterly/weekly-applied-quarterly-list/weekly-applied-quarterly-list.component';
import { WeeklyTaskListComponent } from './list/weekly-task-list/weekly-task-list.component';

const routes: Routes = [
  { path: '', component: WeeklyComponent, children: [ 
      { 
        path: 'applied-quarterly/:quarter/:year', 
        component: WeeklyAppliedQuarterlyListComponent 
      },
      { path: 'create', component: CreateWeeklyTaskComponent },
      { path: 'list', component: WeeklyTaskListComponent },
      { path: 'select-quarterly', component: SelectWeeklyQuarterComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeeklyRoutingModule { }
