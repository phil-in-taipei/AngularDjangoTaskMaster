import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervalTaskGroupComponent } from './interval-task-group.component';

describe('IntervalTaskGroupComponent', () => {
  let component: IntervalTaskGroupComponent;
  let fixture: ComponentFixture<IntervalTaskGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntervalTaskGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntervalTaskGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
