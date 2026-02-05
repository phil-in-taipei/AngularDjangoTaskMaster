import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervalTaskComponent } from './interval-task.component';

describe('IntervalTaskComponent', () => {
  let component: IntervalTaskComponent;
  let fixture: ComponentFixture<IntervalTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntervalTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntervalTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
