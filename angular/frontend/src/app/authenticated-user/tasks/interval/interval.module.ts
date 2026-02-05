import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { IntervalRoutingModule } from './interval-routing.module';

import { 
  ApplyIntervalTaskGroupFormComponent 
} from './applied-quarterly/apply-interval-task-group-form/apply-interval-task-group-form.component';
import { 
  CreateIntervalTaskFormComponent 
} from './detail/create-interval-task-form/create-interval-task-form.component';
import { 
  CreateIntervalTaskGroupComponent 
} from './create/create-interval-task-group/create-interval-task-group.component';
import { 
  CreateIntervalTaskGroupFormComponent 
} from './create/create-interval-task-group-form/create-interval-task-group-form.component';
import { IntervalComponent } from './interval/interval.component';
import {
   IntervalTaskComponent 
  } from './detail/interval-task/interval-task.component';
import { 
  IntervalTaskGroupAppliedQuarterlyComponent 
} from './applied-quarterly/interval-task-group-applied-quarterly/interval-task-group-applied-quarterly.component';
import { 
  IntervalTaskGroupComponent 
} from './list/interval-task-group/interval-task-group.component';
import { 
  IntervalTaskGroupDetailComponent 
} from './detail/interval-task-group-detail/interval-task-group-detail.component';
import { 
  IntervalTaskGroupListComponent 
} from './list/interval-task-group-list/interval-task-group-list.component';
import { 
  IntervalTaskGroupAppliedQuarterlyListComponent 
} from './applied-quarterly/interval-task-group-quarterly-list/interval-task-group-quarterly-list.component';
import { 
  IntervalTaskGroupEffects 
} from './state/interval-task-groups/interval-task-group.effects';
import { 
  intervalTaskGroupsReducer 
} from './state/interval-task-groups/interval-task-group.reducers';
import { 
  IntervalTaskGroupAppliedQuarterlysEffects 
} from './state/groups-applied-quarterly/interval-task-group-applied-quarterly.effects';
import { 
  intervalTaskGroupAppliedQuarterlysReducer 
} from './state/groups-applied-quarterly/interval-task-group-applied-quarterly.reducers';
import { 
  IntervalTaskGroupTemplateStringComponent 
} from './interval-task-group-template-string/interval-task-group-template-string.component';
import { 
  SelectIntervalTaskGroupQuarterComponent 
} from './applied-quarterly/select-interval-task-group-quarter/select-interval-task-group-quarter.component';


@NgModule({
  declarations: [
    ApplyIntervalTaskGroupFormComponent,
    CreateIntervalTaskFormComponent,
    CreateIntervalTaskGroupComponent,
    IntervalTaskGroupAppliedQuarterlyComponent,
    IntervalTaskGroupDetailComponent,
    IntervalTaskGroupAppliedQuarterlyListComponent,
    IntervalTaskGroupTemplateStringComponent,
    CreateIntervalTaskGroupFormComponent,
    IntervalComponent,
    IntervalTaskComponent,
    IntervalTaskGroupComponent,
    IntervalTaskGroupListComponent,
    SelectIntervalTaskGroupQuarterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IntervalRoutingModule,
    StoreModule.forFeature(
      'intervalTasksAppliedQuarterly', 
      intervalTaskGroupAppliedQuarterlysReducer
    ),
    EffectsModule.forFeature([IntervalTaskGroupAppliedQuarterlysEffects]),
    StoreModule.forFeature('intervalTasks', intervalTaskGroupsReducer),
    EffectsModule.forFeature([IntervalTaskGroupEffects]),
  ]
})
export class IntervalModule { }
