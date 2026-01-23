import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UncompletedTasksComponent } from './uncompleted-tasks.component';

describe('UncompletedTasksComponent', () => {
  let component: UncompletedTasksComponent;
  let fixture: ComponentFixture<UncompletedTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UncompletedTasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UncompletedTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
