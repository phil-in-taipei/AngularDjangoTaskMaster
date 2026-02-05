import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIntervalTaskFormComponent } from './create-interval-task-form.component';

describe('CreateIntervalTaskFormComponent', () => {
  let component: CreateIntervalTaskFormComponent;
  let fixture: ComponentFixture<CreateIntervalTaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateIntervalTaskFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateIntervalTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
