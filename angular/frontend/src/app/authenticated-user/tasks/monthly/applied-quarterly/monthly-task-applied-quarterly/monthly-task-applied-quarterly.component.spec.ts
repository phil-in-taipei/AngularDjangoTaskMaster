import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyTaskAppliedQuarterlyComponent } from './monthly-task-applied-quarterly.component';

describe('MonthlyTaskAppliedQuarterlyComponent', () => {
  let component: MonthlyTaskAppliedQuarterlyComponent;
  let fixture: ComponentFixture<MonthlyTaskAppliedQuarterlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyTaskAppliedQuarterlyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonthlyTaskAppliedQuarterlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
