import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDayDetailsComponent } from './table-day-details.component';

describe('TableDayDetailsComponent', () => {
  let component: TableDayDetailsComponent;
  let fixture: ComponentFixture<TableDayDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDayDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDayDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
