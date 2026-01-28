import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWeeklyTaskComponent } from './create-weekly-task.component';

describe('CreateWeeklyTaskComponent', () => {
  let component: CreateWeeklyTaskComponent;
  let fixture: ComponentFixture<CreateWeeklyTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateWeeklyTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateWeeklyTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
