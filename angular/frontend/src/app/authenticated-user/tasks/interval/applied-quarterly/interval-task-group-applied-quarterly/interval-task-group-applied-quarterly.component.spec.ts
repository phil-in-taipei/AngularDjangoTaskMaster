import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervalTaskGroupAppliedQuarterlyComponent } from './interval-task-group-applied-quarterly.component';

describe('IntervalTaskGroupAppliedQuarterlyComponent', () => {
  let component: IntervalTaskGroupAppliedQuarterlyComponent;
  let fixture: ComponentFixture<IntervalTaskGroupAppliedQuarterlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntervalTaskGroupAppliedQuarterlyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntervalTaskGroupAppliedQuarterlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
