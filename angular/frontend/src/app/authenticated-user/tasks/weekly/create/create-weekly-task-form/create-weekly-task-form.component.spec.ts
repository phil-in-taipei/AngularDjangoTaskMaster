import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWeeklyTaskFormComponent } from './create-weekly-task-form.component';

describe('CreateWeeklyTaskFormComponent', () => {
  let component: CreateWeeklyTaskFormComponent;
  let fixture: ComponentFixture<CreateWeeklyTaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateWeeklyTaskFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateWeeklyTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
