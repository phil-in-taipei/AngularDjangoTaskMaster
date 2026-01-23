import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMonthlyTasksComponent } from './select-monthly-tasks.component';

describe('SelectMonthlyTasksComponent', () => {
  let component: SelectMonthlyTasksComponent;
  let fixture: ComponentFixture<SelectMonthlyTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectMonthlyTasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectMonthlyTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
