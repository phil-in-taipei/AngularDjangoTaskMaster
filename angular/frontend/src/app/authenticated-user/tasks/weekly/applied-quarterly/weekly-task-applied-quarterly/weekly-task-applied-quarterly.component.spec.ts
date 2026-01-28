import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyTaskAppliedQuarterlyComponent } from './weekly-task-applied-quarterly.component';

describe('WeeklyTaskAppliedQuarterlyComponent', () => {
  let component: WeeklyTaskAppliedQuarterlyComponent;
  let fixture: ComponentFixture<WeeklyTaskAppliedQuarterlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeklyTaskAppliedQuarterlyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeeklyTaskAppliedQuarterlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
