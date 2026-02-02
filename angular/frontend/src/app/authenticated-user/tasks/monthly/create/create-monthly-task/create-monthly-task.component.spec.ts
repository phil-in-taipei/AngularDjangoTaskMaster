import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMonthlyTaskComponent } from './create-monthly-task.component';

describe('CreateMonthlyTaskComponent', () => {
  let component: CreateMonthlyTaskComponent;
  let fixture: ComponentFixture<CreateMonthlyTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMonthlyTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateMonthlyTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
