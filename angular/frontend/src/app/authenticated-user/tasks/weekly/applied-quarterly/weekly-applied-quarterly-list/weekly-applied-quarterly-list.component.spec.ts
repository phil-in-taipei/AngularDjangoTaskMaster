import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyAppliedQuarterlyListComponent } from './weekly-applied-quarterly-list.component';

describe('WeeklyAppliedQuarterlyListComponent', () => {
  let component: WeeklyAppliedQuarterlyListComponent;
  let fixture: ComponentFixture<WeeklyAppliedQuarterlyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeklyAppliedQuarterlyListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeeklyAppliedQuarterlyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
