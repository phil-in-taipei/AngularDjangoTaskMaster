import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyTaskTemplateStringComponent } from './monthly-task-template-string.component';

describe('MonthlyTaskTemplateStringComponent', () => {
  let component: MonthlyTaskTemplateStringComponent;
  let fixture: ComponentFixture<MonthlyTaskTemplateStringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyTaskTemplateStringComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonthlyTaskTemplateStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
