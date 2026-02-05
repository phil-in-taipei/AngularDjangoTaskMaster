import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervalTaskGroupListComponent } from './interval-task-group-list.component';

describe('IntervalTaskGroupListComponent', () => {
  let component: IntervalTaskGroupListComponent;
  let fixture: ComponentFixture<IntervalTaskGroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntervalTaskGroupListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntervalTaskGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
