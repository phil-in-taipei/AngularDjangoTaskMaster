import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectIntervalTaskGroupQuarterComponent } from './select-interval-task-group-quarter.component';

describe('SelectIntervalTaskGroupQuarterComponent', () => {
  let component: SelectIntervalTaskGroupQuarterComponent;
  let fixture: ComponentFixture<SelectIntervalTaskGroupQuarterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectIntervalTaskGroupQuarterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectIntervalTaskGroupQuarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
