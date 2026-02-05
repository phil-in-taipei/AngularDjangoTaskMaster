import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervalTaskGroupTemplateStringComponent } from './interval-task-group-template-string.component';

describe('IntervalTaskGroupTemplateStringComponent', () => {
  let component: IntervalTaskGroupTemplateStringComponent;
  let fixture: ComponentFixture<IntervalTaskGroupTemplateStringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntervalTaskGroupTemplateStringComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntervalTaskGroupTemplateStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
