import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIntervalTaskGroupComponent } from './create-interval-task-group.component';

describe('CreateIntervalTaskGroupComponent', () => {
  let component: CreateIntervalTaskGroupComponent;
  let fixture: ComponentFixture<CreateIntervalTaskGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateIntervalTaskGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateIntervalTaskGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
