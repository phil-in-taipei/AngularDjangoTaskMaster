import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthenticatedUserRoutingModule } from './authenticated-user-routing.module';


import { SingleTaskEffects } from './tasks/single/state/single-task.effects';
import { singleTasksReducer } from './tasks/single/state/single-task.reducers';
import { UserEffects } from './user/user-state/user.effects';
import { userProfileReducer } from './user/user-state/user.reducers';

import { 
  AuthenticatedFooterComponent 
} from './authenticated-layout/authenticated-footer/authenticated-footer.component';
import { 
  AuthenticatedHeaderComponent 
} from './authenticated-layout/authenticated-header/authenticated-header.component';
import { 
  AuthenticatedUserComponent 
} from './authenticated-user/authenticated-user.component';
import { CreateTaskComponent } from './tasks/single/create/create-task/create-task.component';
import { 
  CreateTaskFormComponent 
} from './tasks/single/create/create-task-form/create-task-form.component';
import { DailyListComponent } from './tasks/single/list/daily-list/daily-list.component';
import { LandingPageComponent } from './landing/landing-page/landing-page.component';
import { 
  LandingPageUserComponent 
} from './landing/landing-page-user/landing-page-user.component';
import { 
  MonthlyListComponent 
} from './tasks/single/list/monthly-list/monthly-list.component';
import { 
  ReselectMonthlyTasksComponent 
} from './tasks/single/list/reselect-monthly-tasks/reselect-monthly-tasks.component';
import { 
  RescheduleTaskFormComponent 
} from './tasks/single/detail/reschedule-task-form/reschedule-task-form.component';
import { 
  SelectMonthlyTasksComponent 
} from './tasks/single/list/select-monthly-tasks/select-monthly-tasks.component';
import { 
  SingleTaskComponent 
} from './tasks/single/list/single-task/single-task.component';
import { 
  TaskDetailComponent 
} from './tasks/single/detail/task-detail/task-detail.component';
import { 
  UncompletedTasksComponent 
} from './landing/uncompleted-tasks/uncompleted-tasks.component';
import { 
  UserProfileComponent 
} from './user/user-profile/user-profile.component';
import { 
  EditProfileFormComponent 
} from './user/edit-profile-form/edit-profile-form.component';


@NgModule({
  declarations: [
    AuthenticatedFooterComponent,
    AuthenticatedHeaderComponent,
    AuthenticatedUserComponent,
    CreateTaskComponent,
    CreateTaskFormComponent,
    DailyListComponent,
    LandingPageComponent,
    LandingPageUserComponent,
    MonthlyListComponent,
    ReselectMonthlyTasksComponent,
    RescheduleTaskFormComponent,
    SelectMonthlyTasksComponent,
    SingleTaskComponent,
    TaskDetailComponent,
    EditProfileFormComponent,
    UncompletedTasksComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    AuthenticatedUserRoutingModule,
    StoreModule.forFeature('singleTasks', singleTasksReducer),
    EffectsModule.forFeature([SingleTaskEffects]),
    StoreModule.forFeature('user', userProfileReducer),
    EffectsModule.forFeature([UserEffects]),
  ]
})
export class AuthenticatedUserModule { }
