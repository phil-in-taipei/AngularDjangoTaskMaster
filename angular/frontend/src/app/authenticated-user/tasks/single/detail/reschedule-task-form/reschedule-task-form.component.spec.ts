import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RescheduleTaskFormComponent } from './reschedule-task-form.component';

describe('RescheduleTaskFormComponent', () => {
  let component: RescheduleTaskFormComponent;
  let fixture: ComponentFixture<RescheduleTaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RescheduleTaskFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RescheduleTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
