import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMonthlyTaskFormComponent } from './create-monthly-task-form.component';

describe('CreateMonthlyTaskFormComponent', () => {
  let component: CreateMonthlyTaskFormComponent;
  let fixture: ComponentFixture<CreateMonthlyTaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMonthlyTaskFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateMonthlyTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
