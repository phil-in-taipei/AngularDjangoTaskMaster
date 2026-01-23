import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyListComponent } from './monthly-list.component';

describe('MonthlyListComponent', () => {
  let component: MonthlyListComponent;
  let fixture: ComponentFixture<MonthlyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonthlyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
