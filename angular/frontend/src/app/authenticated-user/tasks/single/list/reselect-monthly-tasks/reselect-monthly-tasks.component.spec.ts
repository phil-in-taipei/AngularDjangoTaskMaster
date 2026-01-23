import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReselectMonthlyTasksComponent } from './reselect-monthly-tasks.component';

describe('ReselectMonthlyTasksComponent', () => {
  let component: ReselectMonthlyTasksComponent;
  let fixture: ComponentFixture<ReselectMonthlyTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReselectMonthlyTasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReselectMonthlyTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
