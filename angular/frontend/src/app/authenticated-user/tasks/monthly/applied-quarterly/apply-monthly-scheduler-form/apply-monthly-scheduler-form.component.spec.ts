import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyMonthlySchedulerFormComponent } from './apply-monthly-scheduler-form.component';

describe('ApplyMonthlySchedulerFormComponent', () => {
  let component: ApplyMonthlySchedulerFormComponent;
  let fixture: ComponentFixture<ApplyMonthlySchedulerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplyMonthlySchedulerFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplyMonthlySchedulerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
