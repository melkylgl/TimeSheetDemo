import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryDayDetailsComponent } from './summary-day-details.component';

describe('SummaryDayDetailsComponent', () => {
  let component: SummaryDayDetailsComponent;
  let fixture: ComponentFixture<SummaryDayDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryDayDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryDayDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
