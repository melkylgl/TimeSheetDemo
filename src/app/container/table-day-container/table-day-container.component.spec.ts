import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDayContainerComponent } from './table-day-container.component';

describe('TableDayContainerComponent', () => {
  let component: TableDayContainerComponent;
  let fixture: ComponentFixture<TableDayContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDayContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDayContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
