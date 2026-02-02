import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyAppliedQuarterlyListComponent } from './monthly-applied-quarterly-list.component';

describe('MonthlyAppliedQuarterlyListComponent', () => {
  let component: MonthlyAppliedQuarterlyListComponent;
  let fixture: ComponentFixture<MonthlyAppliedQuarterlyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyAppliedQuarterlyListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonthlyAppliedQuarterlyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
