import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../authentication/auth.guard';
import { AuthenticatedUserComponent } from './authenticated-user/authenticated-user.component';
import { CreateTaskComponent } from './tasks/single/create/create-task/create-task.component';
import { DailyListComponent } from './tasks/single/list/daily-list/daily-list.component';
import { LandingPageComponent } from './landing/landing-page/landing-page.component';
import { MonthlyListComponent } from './tasks/single/list/monthly-list/monthly-list.component';
import { TaskDetailComponent } from './tasks/single/detail/task-detail/task-detail.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: AuthenticatedUserComponent, children: [ 
      { path: 'create-task', component: CreateTaskComponent },
      { path: 'task/:id', component: TaskDetailComponent },
      { path: 'tasks-daily/:date', component: DailyListComponent },
      { path: 'tasks-monthly', component: MonthlyListComponent },
      { path: 'landing', component: LandingPageComponent },
      { path: 'user-profile', component: UserProfileComponent },
      { path: 'weekly', loadChildren: () => import('./tasks/weekly/weekly.module')
        .then(m => m.WeeklyModule) 
      },
      { path: "**", redirectTo: 'user-profile' }
    ] 
  },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AuthenticatedUserRoutingModule { }
