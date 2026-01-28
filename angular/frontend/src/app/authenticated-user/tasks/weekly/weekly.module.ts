import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { 
  ApplyWeeklySchedulerFormComponent 
} from './applied-quarterly/apply-weekly-scheduler-form/apply-weekly-scheduler-form.component';

import { 
  SelectWeeklyQuarterComponent 
} from './applied-quarterly/select-weekly-quarter/select-weekly-quarter.component';
import { WeeklyRoutingModule } from './weekly-routing.module';
import { WeeklyTasksEffects } from './state/weekly-schedulers/weekly-task.effects';
import { weeklyTasksReducer } from './state/weekly-schedulers/weekly-task.reducers';
import { 
  CreateWeeklyTaskComponent 
} from './create/create-weekly-task/create-weekly-task.component';
import { 
  CreateWeeklyTaskFormComponent 
} from './create/create-weekly-task-form/create-weekly-task-form.component';
import { 
  WeeklyAppliedQuarterlyListComponent 
} from './applied-quarterly/weekly-applied-quarterly-list/weekly-applied-quarterly-list.component';
import {WeeklyTaskAppliedQuarterlyComponent 

} from './applied-quarterly/weekly-task-applied-quarterly/weekly-task-applied-quarterly.component';
import { WeeklyComponent } from './weekly/weekly.component';
import { 
  WeeklyTaskAppliedQuarterlysEffects 
} from './state/schedulers-applied-quarterly/weekly-applied-quarterly.effects';
import { 
  weeklyTaskAppliedQuarterlysReducer 
} from './state/schedulers-applied-quarterly/weekly-applied-quarterly.reducers';
import { WeeklyTaskComponent } from './list/weekly-task/weekly-task.component';
import { 
  WeeklyTaskListComponent 
} from './list/weekly-task-list/weekly-task-list.component';
import { 
  WeeklyTaskTemplateStringComponent 
} from './weekly-task-template-string/weekly-task-template-string.component';



@NgModule({
  declarations: [
    ApplyWeeklySchedulerFormComponent,
    CreateWeeklyTaskComponent,
    CreateWeeklyTaskFormComponent,
    SelectWeeklyQuarterComponent,
    WeeklyAppliedQuarterlyListComponent,
    WeeklyComponent,
    WeeklyTaskAppliedQuarterlyComponent,
    WeeklyTaskComponent,
    WeeklyTaskListComponent,
    WeeklyTaskTemplateStringComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    WeeklyRoutingModule,
    StoreModule.forFeature(
      'weeklyTasksAppliedQuarterly', 
      weeklyTaskAppliedQuarterlysReducer
    ),
    EffectsModule.forFeature([WeeklyTaskAppliedQuarterlysEffects]),
    StoreModule.forFeature('weeklyTasks', weeklyTasksReducer),
    EffectsModule.forFeature([WeeklyTasksEffects]),
  ]
})
export class WeeklyModule { }
