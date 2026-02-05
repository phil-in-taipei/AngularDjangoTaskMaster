import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyIntervalTaskGroupFormComponent } from './apply-interval-task-group-form.component';

describe('ApplyIntervalTaskGroupFormComponent', () => {
  let component: ApplyIntervalTaskGroupFormComponent;
  let fixture: ComponentFixture<ApplyIntervalTaskGroupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplyIntervalTaskGroupFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplyIntervalTaskGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
