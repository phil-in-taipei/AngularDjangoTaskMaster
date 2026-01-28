import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyTaskTemplateStringComponent } from './weekly-task-template-string.component';

describe('WeeklyTaskTemplateStringComponent', () => {
  let component: WeeklyTaskTemplateStringComponent;
  let fixture: ComponentFixture<WeeklyTaskTemplateStringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeklyTaskTemplateStringComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeeklyTaskTemplateStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
