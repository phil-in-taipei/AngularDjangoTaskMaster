import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMonthlyQuarterComponent } from './select-monthly-quarter.component';

describe('SelectMonthlyQuarterComponent', () => {
  let component: SelectMonthlyQuarterComponent;
  let fixture: ComponentFixture<SelectMonthlyQuarterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectMonthlyQuarterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectMonthlyQuarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
