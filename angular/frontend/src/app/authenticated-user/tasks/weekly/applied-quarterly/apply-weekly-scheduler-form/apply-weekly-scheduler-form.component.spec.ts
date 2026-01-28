import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyWeeklySchedulerFormComponent } from './apply-weekly-scheduler-form.component';

describe('ApplyWeeklySchedulerFormComponent', () => {
  let component: ApplyWeeklySchedulerFormComponent;
  let fixture: ComponentFixture<ApplyWeeklySchedulerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplyWeeklySchedulerFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplyWeeklySchedulerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
