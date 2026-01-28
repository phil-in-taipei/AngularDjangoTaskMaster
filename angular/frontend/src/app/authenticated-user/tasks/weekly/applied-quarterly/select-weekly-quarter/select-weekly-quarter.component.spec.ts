import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectWeeklyQuarterComponent } from './select-weekly-quarter.component';

describe('SelectWeeklyQuarterComponent', () => {
  let component: SelectWeeklyQuarterComponent;
  let fixture: ComponentFixture<SelectWeeklyQuarterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectWeeklyQuarterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectWeeklyQuarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
