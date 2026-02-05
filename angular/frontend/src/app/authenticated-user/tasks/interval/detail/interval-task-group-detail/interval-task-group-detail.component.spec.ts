import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervalTaskGroupDetailComponent } from './interval-task-group-detail.component';

describe('IntervalTaskGroupDetailComponent', () => {
  let component: IntervalTaskGroupDetailComponent;
  let fixture: ComponentFixture<IntervalTaskGroupDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntervalTaskGroupDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntervalTaskGroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
