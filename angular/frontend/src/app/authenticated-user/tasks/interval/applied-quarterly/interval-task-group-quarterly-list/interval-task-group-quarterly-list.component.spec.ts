import { ComponentFixture, TestBed } from '@angular/core/testing';

import { 
  IntervalTaskGroupAppliedQuarterlyListComponent 
} from './interval-task-group-quarterly-list.component';

describe('IntervalTaskGroupQuarterlyListComponent', () => {
  let component: IntervalTaskGroupAppliedQuarterlyListComponent;
  let fixture: ComponentFixture<IntervalTaskGroupAppliedQuarterlyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntervalTaskGroupAppliedQuarterlyListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntervalTaskGroupAppliedQuarterlyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
