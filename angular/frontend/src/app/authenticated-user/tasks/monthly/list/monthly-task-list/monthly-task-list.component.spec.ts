import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyTaskListComponent } from './monthly-task-list.component';

describe('MonthlyTaskListComponent', () => {
  let component: MonthlyTaskListComponent;
  let fixture: ComponentFixture<MonthlyTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyTaskListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonthlyTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
