import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIntervalTaskGroupFormComponent } from './create-interval-task-group-form.component';

describe('CreateIntervalTaskGroupFormComponent', () => {
  let component: CreateIntervalTaskGroupFormComponent;
  let fixture: ComponentFixture<CreateIntervalTaskGroupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateIntervalTaskGroupFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateIntervalTaskGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
